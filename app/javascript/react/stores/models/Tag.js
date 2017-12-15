import { 
  observable, 
  action, 
  computed, 
  autorun,
  toJS
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

import stringify from 'json-stringify-safe'
import {Utils}   from 'react-awesome-query-builder'
import config    from 'ui/shell/QueryBuilder/config'

const {queryBuilderFormat, queryString} = Utils

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


  @setter @observable name               = null
  @observable query                      = null
  @observable treeQuery                  = null
  @observable students                   = observable.shallowArray()

  constructor(name, store, json = {}){
    if(name) {
      this.createTag(name)
    }

    this.tagStore = store
    this.update(json)

    this.autoErrorNotifier()
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
      return queryString(this.treeQuery, config, true)
    } catch(e){
      console.error(e)
      return ''
    }
  }

  @computed get hasStudents(){
    return !this.isFetchingStudents && !_.isEmpty(this.students)
  }

  @computed get tagBody(){
    return {
      user_id:     userStore.user.id,
      district_id: userStore.user.districtID,
      tag_name:    this.name,
      query:       this.queryFormat,
      tree_query:  this.treeFormat
    }
  }

  // Actions
  @action testTag = async() => {
    if(!this.isValid) {
      this.setIsError(new Error('Not a valid tag. Missing query field'))
      return
    }

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
    if(!name) return

    try {
      this.setName(name)
      this.setIsCreating(true)
      this.setIsError(false)

      const {data} = await sxhr.post('/smart_tags', this.tagBody)

      console.log('Tag Created', data)

      // update tag with new data
      this.update(data)
      this.setActive()
      this.tagStore.addTag(this)
    } catch (e) {
      this.setIsError(new Error('Tag name already taken'))
      console.error(e)
    } finally {
      this.setIsCreating(false)
    }
  }


  @action deleteTag = async() => {
    try {
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

      await sxhr.put(`/smart_tags/${this.id}`, this.tagBody)
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
  @action update = ({
    id,
    created_at: createdAt,
    tag_name: name,
    query,
    tree_query: treeQuery,
  }) => {
    this.id        = id
    this.createdAt = createdAt
    this.name      = name
    this.query     = query
    this.treeQuery = fromJS(treeQuery)
  }

  @action setActive = () => {
    this.tagStore.setSelectedTag(this)
    this.testTag()
  }

  @action clear(){
    this.treeQuery = null
  }

  @action setTreeQuery = tree => {
    this.treeQuery = tree
  }
}
