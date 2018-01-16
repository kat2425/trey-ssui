import { 
  observable, 
  action, 
  computed, 
  autorun,
  runInAction
} from 'mobx'

import {
  SCHEMA_XHR as sxhr, 
  QUERY_XHR as xhr
} from 'helpers/XHR'

import { fromJS } from  'immutable'
import { setter } from  'mobx-decorators'
import userStore  from  'stores/UserStore'
import UiStore    from  'stores/UiStore'
import _          from  'lodash'
import uuid       from  'uuid'
import moment     from  'moment'


import stringify  from  'json-stringify-safe'
import {Utils}    from  'react-awesome-query-builder'
import config     from  'ui/shell/QueryBuilder/config'
import Pagination from  'stores/models/Pagination'

const {queryBuilderFormat, queryString} = Utils

const TAG_NAME_PLACEHOLDER = 'Untitled Tag'

export default class Tag {
  static untitledTagsCounter = 0

  id       = null
  tagStore = null
  config   = config

  @setter @observable isFetchingStudents = false
  @setter @observable isCreating         = false
  @setter @observable isUpdating         = false
  @setter @observable isDeleting         = false
  @setter @observable isEditing          = false
  @setter @observable isError            = false
  @setter @observable isNew              = false
  @setter @observable isCloned           = false
  @setter @observable isModified         = false
  @setter @observable hasBeenTested      = true


  @setter @observable name = null
  @observable createdAt    = null

  @observable query        = null
  @observable treeQuery    = null

  @observable studentMap   = observable.map()
  @observable pagination   = new Pagination(this)

  @observable groups       = []
  @observable global       = false
  @observable system       = false
  @observable modifiable   = null

  constructor(conf = {}, parentStore, json = {}){
    this.init(conf, parentStore, json)
    this.initAutoruns()
  }

  // Autoruns
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        UiStore.addNotification('Error', this.isError.message)
      }
    })
  }

  // Computed 
  @computed get students(){
    return this.studentMap.values()
  }

  @computed get isActive(){
    return this.tagStore.selectedTag === this
  }

  @computed get showQueryBuilder(){
    return !this.isFetchingSchema && this.isActive
  }

  @computed get isValid() {
    return !!this.queryFormat && this.name
  }

  @computed get queryFormat(){
    try {
      return stringify(queryBuilderFormat(this.treeQuery, config))
    } catch(e){
      return this.query
    }
  }

  @computed get treeFormat(){
    return stringify(this.treeQuery)
  }

  @computed get humanStringFormat(){
    try {
      return ` of your students whose 
      ${queryString(this.treeQuery, config, true).split('(').join('').split(')').join('')}`
    } catch(e){
      console.warn(e)
      return ''
    }
  }

  @computed get groupIds(){
    return this.groups.map(g => g.id)
  }

  @computed get hasStudents(){
    return !this.isFetchingStudents && !_.isEmpty(this.students)
  }

  @computed get tagAsJson(){
    return {
      user_id:     userStore.user.id,
      district_id: userStore.user.districtID,
      tag_name:    this.name,
      query:       this.queryFormat,
      tree_query:  this.treeFormat
    }
  }

  @computed get isGlobal(){
    return !!this.global || !!this.system
  }

  @computed get isGroup(){
    return !_.isEmpty(this.groups)
  }

  @computed get isPrivate(){
    return !this.isGlobal && !this.isGroup
  }

  @computed get tagParams(){
    return {
      page:  this.pagination.current,
      limit: this.pagination.pageSize
    }
  }

  @computed get isEditable(){
    return !this.isNew 
  }
  @computed get isNotSaved(){
    return !this.isNew && this.isModified
  }
  // Actions
  @action init = (
    {isNew = false, isCloned = false} = {}, 
    parentStore, 
    json
  ) => {
    this.isNew     = isNew
    this.isCloned  = isCloned
    this.tagStore  = parentStore

    !_.isEmpty(json) && this.updateFromJson({...json})

    this.initNewTag({isNew, isCloned, ...json})
  }

  @action initNewTag = ({isNew, isCloned, name} = {}) => {
    const isOnlyNew      = isNew && !isCloned
    const isNewAndCloned = isNew && isCloned

    if(isNew){
      this.id            = uuid()
      this.createdAt     = moment().format()
      this.hasBeenTested = false
      this.setActive()
    }

    if(isOnlyNew){
      this.name = `${TAG_NAME_PLACEHOLDER} ${++Tag.untitledTagsCounter}`
    }

    if(isNewAndCloned){
      this.name = `${name} (cloned)`
    }
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action testTag = async() => {
    try {
      this.setIsFetchingStudents(true)
      this.setIsError(false)

      const {headers, data: students} = await xhr.post('/query/fetch', 
        { query: this.queryFormat },
        { params: this.tagParams }
      )

      runInAction(() => {
        students.forEach(this.addStudent)
        this.setPagination(headers)
        if(!this.hasBeenTested) {this.hasBeenTested = true}
      })
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsFetchingStudents(false)
    }
  }

  @action addStudent = student => {
    if(this.studentMap.has(student.id)) return
    this.studentMap.set(student.id, student)
  }

  @action createTag = async(params) => {
    const wasActive = this.isActive

    try {
      this.setIsCreating(true)
      this.setIsError(false)

      const {data} = await sxhr.post('/smart_tags', {
        ...this.tagAsJson, 
        tag_name: params.name,
        ...this.getScopeParams(params)
      })

      runInAction(() => {
        this.resetStatus()


        // delete the old tag with random id
        this.tagStore.deleteTag(this)

        this.updateFromJson(data)

        // add this tag with updated data from server
        this.tagStore.addTag(this)
        wasActive && this.tagStore.setSelectedTag(this)

        UiStore.addNotification('Tag', 'created successfully')

        this.tagStore.toggleQueryForm()
      })
    } catch (e) {
      this.setIsError({
        hideNotification: true,
        message:          e.message
      })
      console.error(e)
    } finally {
      this.setIsCreating(false)
    }
  }


  @action deleteTag = async() => {
    try {
      if(this.isNew){
        this.tagStore.deleteTag(this)
        return
      }

      await sxhr.delete(`/smart_tags/${this.id}`)
      runInAction(() => {
        this.tagStore.deleteTag(this)

        UiStore.addNotification('Tag', 'deleted successfully')
      })
    } catch(e) {
      this.setIsError(e)
    }   
  }

  /*
   * updates tag on the server
   */
  @action updateTag = async(params = {}) => {
    if(!this.isValid) return

    const {name} = params

    try {
      this.setIsUpdating(true)
      this.setIsError(false)

      const tagBody = name ? {
        ...this.tagAsJson, 
        tag_name: name,
        ...this.getScopeParams(params)
      } : this.tagAsJson

      const {data} = await sxhr.put(`/smart_tags/${this.id}`, tagBody)

      runInAction(() => {
        this.resetStatus()
        this.updateFromJson(data)
        this.tagStore.showQueryForm && this.tagStore.toggleQueryForm()
        UiStore.addNotification('Tag', 'saved successfully')
      })
    } catch (e) {
      const message = name ? 'Tag name already taken' : e.message

      this.setIsError({message})
      console.error(e)
    } finally {
      this.setIsUpdating(false)
    }
  }
  
  /*
   * updates 'this' tag
  */
  @action updateFromJson = ({
    id,
    created_at: createdAt,
    tag_name: name,
    query,
    tree_query: treeQuery,
    modifiable,
    system,
    global,
    groups
  }) => {
    this.id         = id
    this.name       = name
    this.createdAt  = createdAt
    this.query      = query
    this.treeQuery  = fromJS(treeQuery)
    this.modifiable = modifiable
    this.system     = system
    this.global     = global
    this.groups     = groups
  }

  @action setActive = () => {
    this.tagStore.setSelectedTag(this)
  }

  @action clear(){
    this.treeQuery = null
  }

  @action setTreeQuery = tree => {
    this.isModified = true
    this.treeQuery  = tree
  }

  @action handleOnTagClick = () => {
    if(!this.isValid) return

    this.setActive()
    this.testTag()
  }

  @action handleOnSave = (data) => {
    this.tagStore.editedTag = this

    if(this.isNew) { 
      this.tagStore.showQueryForm ? this.createTag(data) : this.tagStore.toggleQueryForm() 
    } 
    else { this.updateTag(data) }
  }

  @action getScopeParams = ({scope, groupIds}) => {
    return {
      global:    scope === 'global',
      system:    scope === 'system',
      group_ids: _.isEmpty(groupIds) ? null : groupIds
    }
  }

  @action dispose = () => {
    this.autoErrorNotifier && this.autoErrorDisposer()
  }

  @action clearErrors = () => {
    this.setIsError(null)
  }

  @action setPagination = ({total}) => {
    this.pagination.setTotal(parseInt(total))
    this.pagination.calculateTotalResults()
  }

  @action onPageChange = () => {
    this.testTag()
  }

  @action resetStatus = () => {
    this.setIsNew(false)
    this.setIsCloned(false)
    this.setIsModified(false)
  }
}
