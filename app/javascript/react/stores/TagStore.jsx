import { 
  observable, 
  action, 
  computed,
  autorun
} from 'mobx'

import { SCHEMA_XHR as sxhr } from 'helpers/XHR'
import { setter }             from 'mobx-decorators'
import _                      from 'lodash'

import Tag                    from 'stores/models/Tag'
import UiStore                from 'stores/UiStore'
import config                 from 'ui/shell/QueryBuilder/config'

export class TagStore {
  @setter @observable isFetchingSchema = false
  @setter @observable isFetchingTags   = false
  @setter @observable isError          = null
  @setter @observable isSelectingTag   = false

  @observable showMap                  = false
  @observable showQueryForm            = false

  @observable selectedTag      = null
  @observable tags                     = observable.map()

  constructor(){
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

  // Computed Values
  @computed get orderedTags() {
    return _.orderBy(this.tags.values(), t => t.createdAt, 'desc')
  }

  @computed get hasTags(){
    return !this.isFetchingTags && this.tags.size > 0
  }

  // Actions
  @action fetchTags = async() => {
    try {
      this.setIsFetchingTags(true)
      this.setIsError(false)

      const {data:tags} = await sxhr.get('/smart_tags')

      tags.forEach(this.updateTagFromServer)
    } catch (e) {
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsFetchingTags(false)
    }
  }

  @action fetchSchema = async() => {
    try {
      this.setIsFetchingSchema(true)
      this.setIsError(false)

      const {data} = await sxhr.get('query_builders/smart_tags/schema')

      config.fields = data
    } catch (e) {
      this.setIsError(new Error('Fetching schema'))
      console.error(e)
    } finally {
      this.setIsFetchingSchema(false)
    }
  }

  @action updateTagFromServer = tag => {
    if (this.tags.has(tag.id)) return
    this.tags.set(tag.id, new Tag(false, this, tag))
  }

  @action handleOnNewQuery = () => {
    const newTag = new Tag(true, this)

    this.tags.set(newTag.id, newTag)
  }

  /*
   * Used by Tag Model to add itself to the tag list. 
   * A tag is added to the list only after it has been validated (unique name).
   */
  @action addTag = tag => {
    this.tags.set(tag.id, tag)
  }

  @action setLoadingState = () => {
    this.setIsLoading(true)
    this.setIsError(false)
  }

  @action deleteTag(tag){
    if(this.selectedTag === tag) {
      this.selectedTag = null
    }

    this.tags.delete(tag.id)
  }

  @action toggleMap = () => {
    this.showMap = !this.showMap
  }

  @action toggleQueryForm = () => {
    this.showQueryForm = !this.showQueryForm
  }

  @action createTag = (name) => {
    if(!name) {
      this.setError(new Error('Tag name required'))
      return 
    }

    this.selectedTag && this.selectedTag.createTag(name)
  }
  @action setSelectedTag = (tag) => {
    this.isSelectingTag = true
    this.selectedTag = null

    setTimeout(action(() => {
      this.selectedTag = tag
      this.isSelectingTag = false
    }), 300)
  }
}

const singleton = new TagStore()

export default singleton
