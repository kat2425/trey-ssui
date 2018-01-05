import { 
  observable, 
  action, 
  computed, 
  autorun
} from 'mobx'
import {
  SCHEMA_XHR as sxhr, 
  QUERY_XHR as xhr
} from 'helpers/XHR'

import {fromJS}   from 'immutable'
import { setter } from 'mobx-decorators'
import userStore  from 'stores/UserStore'
import UiStore    from 'stores/UiStore'
import _          from 'lodash'
import uuid       from 'uuid'
import moment     from 'moment'


import stringify from 'json-stringify-safe'
import {Utils}   from 'react-awesome-query-builder'
import config    from 'ui/shell/QueryBuilder/config'

const {queryBuilderFormat, queryString} = Utils

const TAG_NAME_PLACEHOLDER = 'Untitled Tag'

export default class Tag {
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
  @setter @observable isModified         = false


  @setter @observable name               = null
  @observable createdAt                  = null 
  @observable query                      = null
  @observable treeQuery                  = null
  @observable students                   = observable.shallowArray()

  constructor(isNew = false, parentStore, json = {}){
    this.init(isNew, parentStore, json)
    this.initAutoruns()
  }

  // Autoruns
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError){
        UiStore.addNotification('Error', this.isError.message)
      }
    })
  }

  // Computed 
  @computed get isActive(){
    return this.tagStore.selectedTag === this
  }

  @computed get showQueryBuilder(){
    return !this.isFetchingSchema && this.isActive
  }

  @computed get isValid() {
    return (!!this.query || !!this.treeQuery) && !!this.name
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
      return ` of your students whose ${ queryString(this.treeQuery, config, true).split('(').join('').split(')').join('')}`
    } catch(e){
      console.error(e)
      return ''
    }
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

  // Actions
  @action init = (isNew, parentStore, json) => {
    this.id        = uuid()
    this.createdAt = moment().format()
    this.isNew     = isNew
    this.tagStore  = parentStore

    if(isNew){
      this.name = TAG_NAME_PLACEHOLDER
      this.setActive()
    }

    !_.isEmpty(json) && this.updateFromJson(json)
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action testTag = async() => {
    try {
      this.setIsFetchingStudents(true)
      this.setIsError(false)

      const {data} = await xhr.post('/query/fetch', {
        query: this.queryFormat
      })

      this.students.replace(data)
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsFetchingStudents(false)
    }
  }

  @action createTag = async(name) => {
    try {
      this.setIsCreating(true)
      this.setIsError(false)

      const {data} = await sxhr.post('/smart_tags', {...this.tagAsJson, tag_name: name})

      this.updateFromJson(data)
      this.setIsNew(false)
      this.setIsModified(false)

      this.tagStore.toggleQueryForm()
    } catch (e) {
      this.setIsError(new Error('Tag name already taken'))
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
      this.tagStore.deleteTag(this)

      UiStore.addNotification('Tag', 'deleted successfully')
    } catch(e) {
      this.setIsError(e)
    }   
  }

  /*
   * updates tag on the server
   */
  @action updateTag = async() => {
    if(!this.isValid) return

    try {
      this.setIsUpdating(true)
      this.setIsError(false)

      await sxhr.put(`/smart_tags/${this.id}`, this.tagAsJson)

      UiStore.addNotification('Tag', 'saved successfully')

      this.setIsNew(false)
      this.setIsModified(false)
    } catch (e) {
      this.setIsError(e)
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
    tree_query: treeQuery
  }) => {
    this.id        = id
    this.createdAt = createdAt
    this.name      = name
    this.query     = query
    this.treeQuery = fromJS(treeQuery)
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
    this.setActive()

    if(this.isNew) return

    this.testTag()
  }

  @action handleOnSave = () => {
    if(this.isNew) { this.tagStore.toggleQueryForm() }
    else { this.updateTag() }
  }

  @action dispose = () => {
    this.autoErrorNotifier && this.autoErrorDisposer()
  }
}
