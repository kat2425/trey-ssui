import {
  observable,
  action,
  autorun,
  computed
} from 'mobx'

import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import UiStore    from 'stores/UiStore'
import Group      from 'stores/models/Group'
import _          from 'lodash'

export class GroupStore {
  @setter @observable isLoading = false
  @setter @observable isError = false
  @setter @observable groups = observable.map()

  contructor(){
    this.autoErrorNotifier()
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
  @computed get orderedGroups(){
    return _.orderBy(this.groups.values(), t => t.createdAt, 'desc')
  }

  // Actions
  @action fetchGroups = async() => {
    try{
      this.setIsLoading(true)
      const {data:groups} = await xhr.get('/groups', {params: {
        type: 'user'
      }})

      groups.forEach(this.updateFromServer)
    } catch(e){
      this.setIsError(e)
      console.error(e)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action updateFromServer = json => {
    if(this.groups.has(json.id)) return

    const group = new Group(this)

    group.updateFromJson(json)
    this.groups.set(group.id, group)
  }

  @action dispose = () => {
    this.autoErrorNotifier && this.autoErrorNotifier()
  }

  @action getIdsFromNames = (names = []) => {
    return names.map(name => 
      this.groups.values().find(g => g.name === name)
    )
  }
}

const singleton = new GroupStore()

export default singleton
