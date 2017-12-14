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

import { setter, toggle } from 'mobx-decorators'

import userStore          from 'stores/UserStore'
import Tag                from 'stores/models/Tag'
import UiStore            from 'stores/UiStore'
import _                  from 'lodash'



const studentData = [
  {
    'id':          '51db4e3fe9c77f81290015ab',
    'first_name':  'Joan',
    'last_name':   'Campbell',
    'grade':       '03',
    'school_name': 'Anytown Upper Elementary Sch',
    'latitude':    '30.813846811652184',
    'longitude':   '-89.42892752587795'
  },
  {
    'id':          '51db4db9e9c77f8129001148',
    'first_name':  'Johnny',
    'last_name':   'Stewart',
    'grade':       '06',
    'school_name': 'Middle School Of Anytown',
    'latitude':    '30.81266261637211',
    'longitude':   '-89.51103396713734'
  },
  {
    'id':          '51db4e26e9c77f81290014ce',
    'first_name':  'Benjamin',
    'last_name':   'Gray',
    'grade':       '05',
    'school_name': 'Anytown Upper Elementary Sch',
    'latitude':    '30.812476202845573',
    'longitude':   '-89.41530995070934'
  }
]

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

  @observable activeTagId   = null

  @observable tags          = observable.map()
  @observable students      = observable.shallowArray()

  constructor(){
    //this.students.replace(studentData)

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
      user_id:     userStore.user.id,
      district_id: userStore.user.districtID,
      tag_name:    'Test 1',
      tree_query:  this.treeFormat,
      query:       this.builderFormat
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
      const {data} = await sxhr.get('/smart_tags')

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
  saveTag = async() => {
    if(!this.isValidFormat) return

    try {
      this.setLoadingState()
      const {data} = await sxhr.post('/smart_tags', this.tagData)

      UiStore.addNotification('Sucessfully Saved')
      console.log('Saved Tag', data)
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

  @action
  handleOnTagChange = (tag) => {
    this.activeTagId = tag.id
  }
}

const singleton = new TagStore()

export default singleton
