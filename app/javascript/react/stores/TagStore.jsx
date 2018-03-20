import { 
  observable, 
  action, 
  computed,
  autorun,
  runInAction,
  toJS
} from 'mobx'

import { 
  SCHEMA_XHR as sxhr, 
  QUERY_XHR as qxhr
} from  'helpers/XHR'

import { setter } from 'mobx-decorators'
import _          from 'lodash'
import Tag        from 'stores/models/Tag'
import Pagination from 'stores/models/Pagination'
import UiStore    from 'stores/UiStore'
import config     from 'ui/shell/QueryBuilder/config/'
import getError   from 'helpers/ErrorParser'

export class TagStore {
  @setter @observable isFetchingSchema = false
  @setter @observable isFetchingTags   = false
  @setter @observable isFetchingTagCSV = false
  @setter @observable isError          = null
  @setter @observable isSelectingTag   = false
  @setter @observable tagFilter        = ''

  @observable showMap                  = false
  @observable showQueryForm            = false
  @observable pagination               = new Pagination(this)

  @observable selectedTag              = null
  @observable editedTag                = null
  @observable tags                     = observable.map()

  constructor(){
    this.autoErrorNotifier()
  }

  // Autoruns
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        UiStore.addNotification({title: this.isError.title, message: this.isError.message, type: 'error'})
      }
    })
  }

  // Computed Values
  @computed get orderedTags() {
    const orderedTags = _.orderBy(this.tags.values(), t => t.createdAt, 'desc')

    if(!this.tagFilter) return orderedTags
    return orderedTags.filter(t => t.name.toLowerCase().indexOf(this.tagFilter.toLowerCase()) > -1)
  }

  @computed get hasTags() {
    return !this.isFetchingTags && !this.isEmpty
  }

  @computed get isEmpty() {
    return !this.tags.size
  }

  @computed get isSchemaError(){
    return _.isEmpty(config.fields) && !this.isFetchingSchema
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
      const error = getError(e)

      this.setIsError({
        message: error.message,
        title:   error.title
      })
      console.error(e)
    } finally {
      this.setIsFetchingTags(false)
    }
  }

  @action fetchTagCSV = async(tag) => {
    try {
      this.setIsFetchingTagCSV(true)
      this.setIsError(false)

      const {data} = await qxhr.get(`/query/fetch/${tag.id}/csv`, {
        headers: { 'Accept': 'application/csv' }
      })

      this.downloadCSV(tag.name, data)
    } catch (e) {
      const error = getError(e)

      this.setIsError({
        message: error.message,
        title:   error.title
      })
      console.error(e)
    } finally {
      this.setIsFetchingTagCSV(false)
    }
  }

  @action downloadCSV = (name, csv) => {
    const csvContent = `data:text/csv;charset=utf-8,${csv}`
    const targetURI = encodeURI(csvContent)

    const link = document.createElement('a')
    link.setAttribute('href', targetURI)
    link.setAttribute('download', `${name}.csv`)
    document.body.appendChild(link)
    link.click()
  }

  @action fetchSchema = async() => {
    try {
      this.setIsFetchingSchema(true)
      this.setIsError(false)

      const {data} = await sxhr.get('query_builders/smart_tags/schema')

      config.fields = data
    } catch (e) {
      const error = getError(e)

      this.setIsError({
        message: error.message,
        title:   error.title
      })
      console.error(e)
    } finally {
      this.setIsFetchingSchema(false)
    }
  }

  @action updateTagFromServer = tag => {
    this.addTag(new Tag({}, this, tag))
  }

  @action handleAddTag = () => {
    this.addTag(new Tag({isNew: true}, this))
    this.showMap = false
  }

  @action addTag = tag => {
    if(this.tags.has(tag.id)) return
    this.tags.set(tag.id, tag)
  }

  @action setLoadingState = () => {
    this.setIsLoading(true)
    this.setIsError(false)
  }

  @action deleteTag(tag = {}){
    if(this.selectedTag === tag) {
      this.selectedTag = null
    }

    if(!this.tags.has(tag.id)) return
    this.tags.delete(tag.id)
  }

  @action toggleMap = () => {
    this.showMap = !this.showMap
  }

  @action toggleQueryForm = () => {
    this.showQueryForm = !this.showQueryForm
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
    ]
    const clonedTag = _.pick(toJS(tag), picked)
    const json      = { 
      ...clonedTag, 
      'tree_query': clonedTag.treeQuery ? clonedTag.treeQuery.toJS() : null
    }
    const conf      = {isNew: true, isCloned: true}
    const newTag    = new Tag(conf,this,json)

    this.addTag(newTag)
  }

  @action editTag = (tag = {}) => {
    if(!this.tags.has(tag.id)) return

    this.editedTag = tag
    this.toggleQueryForm()
  }
}

export default new TagStore()
