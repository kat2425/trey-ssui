import { 
  observable, 
  action, 
  computed,
  autorun,
  runInAction,
  toJS
} from 'mobx'

import { SCHEMA_XHR as sxhr } from  'helpers/XHR'
import { setter }             from  'mobx-decorators'
import _                      from  'lodash'

import Tag                    from  'stores/models/Tag'
import Pagination             from  'stores/models/Pagination'
import UiStore                from  'stores/UiStore'
import config                 from  'ui/shell/QueryBuilder/config'

export class TagStore {
  @setter @observable isFetchingSchema = false
  @setter @observable isFetchingTags   = false
  @setter @observable isError          = null
  @setter @observable isSelectingTag   = false
  @setter @observable tagFilter        = ''

  @observable showMap                  = false
  @observable showQueryForm            = false
  @observable pagination               = new Pagination(this)

  @observable selectedTag              = null
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
    const orderedTags = _.orderBy(this.tags.values(), t => t.createdAt, 'desc')

    if(!this.tagFilter) return orderedTags
    return orderedTags.filter(t => t.name.indexOf(this.tagFilter) > -1)
  }

  @computed get hasTags() {
    return !this.isFetchingTags && !this.isEmpty
  }

  @computed get isEmpty() {
    return !this.tags.size
  }

  @computed get smartTagsParams(){
    return {
      page:  this.pagination.current,
      limit: this.pagination.pageSize
    }
  }

  // Actions
  @action fetchTags = async() => {
    try {
      this.setIsFetchingTags(true)
      this.setIsError(false)

      const {headers, data:tags} = await sxhr.get('/smart_tags', {params: this.smartTagsParams})

      runInAction(() => {
        this.setPagination(headers)
        tags.forEach(this.updateTagFromServer)
        this.pagination.calculateTotalResults()
      })
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
    this.tags.set(tag.id, new Tag({}, this, tag))
  }

  @action handleAddTag = () => {
    const newTag = new Tag({isNew: true}, this)

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
    if(this.selectedTag === tag) return 

    this.isSelectingTag = true
    this.selectedTag = null

    setTimeout(action(() => {
      this.selectedTag = tag
      this.isSelectingTag = false
    }), 100)
  }

  @action handleTagFilter = ({target}) => {
    this.tagFilter = target.value
  }

  @action setPagination = ({total}) => {
    this.pagination.setTotal(parseInt(total))
  }

  @action onPageChange = () => {
    this.fetchTags()
  }

  @action cloneTag = (tag) => {
    const picked = [
      'name',
      'query',
      'treeQuery',
      'system',
      'modifiable',
      'global',
      'groups',
      'students'
    ]
    const clonedTag = _.pick(toJS(tag), picked)
    const newTag = new Tag({isNew: true, isCloned: true}, this, {...clonedTag, 'tree_query': clonedTag.treeQuery})

    this.tags.set(newTag.id, newTag)
  }
}

const singleton = new TagStore()

export default singleton
