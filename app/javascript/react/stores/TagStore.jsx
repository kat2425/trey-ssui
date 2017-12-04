import { 
  observable, 
  action, 
  computed 
} from 'mobx'

import { setter, toggle } from 'mobx-decorators'
import xhr                from 'helpers/XHR'

import Tag                from 'stores/models/Tag'

const API = '/commo/tags'

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
  
  constructor() {
    this.fetchSchema()
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
      const {data} = await xhr.get(`${API}`)

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
      const {data} = await xhr.get(`${API}/schema`)

      this.setSchema(data)
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
      const {data} = await xhr.post(`${API}/save`, this.tagData)

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
      const {data} = await xhr.post(`${API}/test`, this.tagData)

      return data
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
      const {data} = await xhr.post(`${API}/export`, {type, id})

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
}

const singleton = new TagStore()

export default singleton
