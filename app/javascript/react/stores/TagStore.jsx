import { 
  observable, 
  action, 
  computed,
  autorun
} from 'mobx'

import { setter, toggle }                     from 'mobx-decorators'
import {SCHEMA_XHR as sxhr, QUERY_XHR as xhr} from 'helpers/XHR'

import Tag                                    from 'stores/models/Tag'
import UiStore                                from 'stores/UiStore'
import _                                      from 'lodash'


export class TagStore {
  @setter 
  @observable builderFormat = null

  @setter 
  @observable treeFormat    = null

  @setter 
  @observable isError       = null

  @setter 
  @observable isLoading     = false

  @toggle 
  @observable mapView       = false

  @setter 
  @observable schema        = null

  @observable tags          = observable.map()
  @observable students      = observable.shallowArray()

  contructor(){
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError){
        UiStore.addNotification('Error', this.isError.message)
      }
    })
  }

  // Computed Values
  @computed get isValidFormat() {
    return !!this.builderFormat && !!this.treeFormat
  }

  @computed get tagData(){
    return {
      treeFormat:    this.treeFormat,
      builderFormat: this.builderFormat
    }
  }

  @computed get disable(){
    return this.isLoading || !this.isValidFormat
  }

  @computed get isFetchingSchema(){
    return this.isLoading && !this.schema
  }

  @computed get isFetchingResults(){
    return this.schema && this.isLoading
  }

  @computed get hasResults(){
    return !this.isLoading && !_.isEmpty(this.students)
  }

  // Actions
  @action
  handleChange = (treeFormat, builderFormat) => {
    this.treeFormat = treeFormat
    this.builderFormat = builderFormat
  }

  @action
  fetchTags = async() => {
    try {
      this.setLoadingState()
      const {data} = await xhr.get('/query/fetch')

      this.updateTags(data)
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  fetchSchema = async() => {
    try {
      this.setLoadingState()
      const {data} = await sxhr.get('query_builders/smart_tags/schema')

      this.schema = data
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  saveTag = async(treeFormat, builderFormat) => {
    if(!this.isValidFormat) return

    try {
      this.setLoadingState()
      const {data} = await xhr.post('/save', this.tagData)

      UiStore.addNotification('Sucessfully Saved')
      return data
    } catch (e) {
      this.setIsError(e)
      console.error(e)

      return false
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  testTag = async() => {
    if(!this.isValidFormat) return

    try {
      this.setLoadingState()

      const {data} = await xhr.post('/query/fetch', {
        query: this.builderFormat
      })

      this.students.replace(data)
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  exportDocument = async(type, id) => {
    try {
      this.setLoadingState()
      const {data} = await xhr.post('/export', {type, id})

      return data
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  updateTags(tags) {
    tags.forEach(this.createTag)
  }

  @action
  createTag = tag => {
    if (this.tags.has(tag.id)) return
    this.tags.set(tag.id, new Tag(this, tag))
  }

  @action
  setLoadingState = () => {
    this.setIsLoading(true)
    this.setIsError(false)
  }

  @action
  clear = () => {
    this.treeFormat = null
    this.builderFormat = null
  }
}

const singleton = new TagStore()

export default singleton
