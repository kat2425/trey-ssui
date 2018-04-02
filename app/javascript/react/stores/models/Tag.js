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

import getError      from 'helpers/ErrorParser'

import { setter }    from 'mobx-decorators'
import userStore     from 'stores/UserStore'
import UiStore       from 'stores/UiStore'
import _             from 'lodash'
import uuid          from 'uuid'
import moment        from 'moment'

import stringify     from 'json-stringify-safe'
import {Utils}       from 'react-awesome-query-builder'
import config        from 'ui/shell/QueryBuilder/config/'
import Pagination    from 'stores/models/Pagination'
import fromJSOrdered from 'helpers/fromJSOrdered'

const {queryBuilderFormat, queryString} = Utils

const TAG_NAME_PLACEHOLDER = 'Untitled List'

export const TABS = {
  QUERY_BUILDER: 'query-builder',
  MAP:           'map',
  STUDENTS:      'students'
}

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
  @setter @observable activeTab          = TABS.STUDENTS

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
        UiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    'error'
        })
      }
    })
  }

  // Computed 
  @computed get students(){
    return this.studentMap.values().map(this.mapStudent)
  }

  @computed get isActive(){
    return this.tagStore.selectedTag === this
  }

  @computed get showQueryBuilderTab(){
    return this.activeTab === TABS.QUERY_BUILDER
  }

  @computed get showMapTab(){
    return this.activeTab === TABS.MAP
  }

  @computed get showStudentsTab(){
    return this.activeTab === TABS.STUDENTS
  }

  @computed get showQueryBuilder(){
    return !this.isFetchingSchema && this.isActive
  }

  @computed get isValid() {
    return !!this.queryFormat && this.name
  }

  @computed get queryFormat(){
    try {
      if(!this.treeQuery || !this.treeQuery.get('type')) return null

      return stringify(queryBuilderFormat(this.treeQuery, config))
    } catch(e){
      console.error(e)
      return this.query ? stringify(this.query) : null
    }
  }

  @computed get treeFormat(){
    return stringify(this.treeQuery)
  }

  @computed get humanStringFormat(){
    try {
      if(!this.treeQuery || !this.treeQuery.get('type')) return ''      

      let output = queryString(this.treeQuery, config, true)

      if (output) {
        output = output.split('(').join('').split(')').join('')
        output = output.replace(/\bor|and\b/g, '<span class="super-bold">$&</span>')
        output = ` of your students whose ${output}`
      } else {
        output = ''
      }

      return output
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

  @computed get isGlobal(){
    return !!this.global || !!this.system
  }

  @computed get isGroup(){
    return !_.isEmpty(this.groups)
  }

  @computed get isPrivate(){
    return !this.isGlobal && !this.isGroup
  }

  @computed get paginationParams(){
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
      this.setActiveTab(TABS.QUERY_BUILDER)
    }

    if(isOnlyNew){
      this.name = `${TAG_NAME_PLACEHOLDER} ${++Tag.untitledTagsCounter}`
      this.modifiable = true
    }

    if(isNewAndCloned){
      this.name       = `${name} (cloned)`
      this.modifiable = true
    }
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action testTag = async() => {
    if(!this.isValid) return

    try {
      this.setIsFetchingStudents(true)
      this.setIsError(false)

      const { headers, data: students } = await this.testTagQueryEndpoint()

      runInAction(() => {
        this.studentMap.clear()
        students.forEach(this.addStudent)
        this.setPagination(headers)
        this.hasBeenTested = true
      })
    } catch (e) {
      this.setIsError( e.message === 'timeout of 300000ms exceeded'
        ? {
          title:   'Error',
          message: 'This query may take some time to complete, please try again in a little while.',
          type:    'error'
        }
        : getError(e)
      )
      console.error(e)
    } finally {
      this.setIsFetchingStudents(false)
    }
  }

  @action addStudent = student => {
    if(this.studentMap.has(student.id)) return
    this.studentMap.set(student.id, student)
  }

  @action createTag = async() => {
    const wasActive = this.isActive

    try {
      this.setIsCreating(true)
      this.setIsError(false)

      const {data} = await sxhr.post('/smart_tags', {...this.getTagParams()})

      runInAction(() => {
        this.resetStatus()

        // delete the old tag with random id
        this.tagStore.deleteTag(this)

        this.updateFromJson(data)

        // add this tag with updated data from server
        this.tagStore.addTag(this)
        wasActive && this.tagStore.setSelectedTag(this)

        UiStore.addNotification({title: 'List', message: 'created successfully', type: 'success'})
      })
    } catch (e) {
      this.setIsError(getError(e))
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

      this.setIsDeleting(true)
      this.setIsError(false)

      await sxhr.delete(`/smart_tags/${this.id}`)
      runInAction(() => {
        this.tagStore.deleteTag(this)

        UiStore.addNotification({title: 'List', message: 'deleted successfully', type: 'success'})
      })
    } catch(e) {
      this.setIsError(getError(e))
      console.error(e)
    } finally {
      this.setIsDeleting(false)
    }
  }

  /*
   * updates tag on the server
   */
  @action saveTag = async() => {
    if(!this.isValid) return

    try {
      this.setIsUpdating(true)
      this.setIsError(false)

      const {data} = await sxhr.put(`/smart_tags/${this.id}`, {...this.getTagParams()})

      runInAction(() => {
        this.resetStatus()
        this.updateFromJson(data)
        this.tagStore.showQueryForm && this.tagStore.toggleQueryForm()

        UiStore.addNotification({title: 'List', message: 'saved successfully', type: 'success'})
      })
    } catch (e) {
      this.setIsError(getError(e))
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
    groups,
    user
  }) => {
    this.id         = id
    this.name       = name
    this.createdAt  = createdAt
    this.query      = query
    this.treeQuery  = fromJSOrdered(treeQuery)
    this.modifiable = modifiable
    this.system     = system
    this.global     = global
    this.groups     = groups
    this.createdBy  = user
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

    this.clearStudents()
    this.pagination.clear()
  }

  @action handleOnTagClick = () => {
    this.setActive()
    this.testTag()
  }

  @action handleOnSave = () => {
    if(this.isNew){
      this.createTag()
    } else {
      this.saveTag()
    }
  }

  // Used by the TagForm to update a tag 
  @action updateTag = ({ name, scope, groupIds }) => {
    this.name   = name
    this.global = scope ? scope === 'global' : this.global
    this.system = scope ? scope === 'system' : this.system
    this.groups = groupIds ? groupIds.split(',') : this.groups

    this.isModified = true
  }

  @action getTagParams = () => {
    return {
      user_id:     userStore.user.id,
      district_id: userStore.user.districtID,
      query:       this.queryFormat,
      tree_query:  this.treeFormat,
      tag_name:    this.name,
      global:      this.global,
      system:      this.system,
      group_ids:   this.groupIds.join(',')
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

  @action clearStudents = () => {
    this.studentMap.clear()
    this.hasBeenTested = false
  }

  @action mapStudent = student => ({
    ...student, 
    latitude:  parseFloat(student.latitude),
    longitude: parseFloat(student.longitude)
  })

  // Helper Functions
  // ------------------------------------------------------------------------------
  testTagQueryEndpoint = () => {
    if (this.isNew || this.isModified) {
      return xhr.post('/query/fetch', 
        { query: this.queryFormat },
        { params: this.paginationParams }
      )  
    } else {
      return xhr.get(`/query/fetch/${this.id}`, 
        { params: this.paginationParams }
      ) 
    }
  }
}

