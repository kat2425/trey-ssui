import {
  observable,
  action,
  autorun,
  computed
} from 'mobx'

import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import uiStore    from 'stores/UiStore'
import getError   from 'helpers/ErrorParser'
import Group      from 'stores/models/Group'
import _          from 'lodash'

export class GroupStore {
  @setter @observable isLoading = false
  @setter @observable isError = false
  @setter @observable groups = observable.map()

  contructor(){
    this.initAutoruns()
  }

  // Computed
  @computed get orderedGroups(){
    return _.orderBy(this.groups.values(), t => t.createdAt, 'desc')
  }

  // Actions
  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action fetchGroups = async() => {
    try{
      this.setIsLoading(true)
      const {data:groups} = await xhr.get('/groups', {params: {
        type:         'user',
        show_members: true,
        only:         [
          'id', 'group_name', 'group_type', 'description', 'group_id', 
          'created_at', 'updated_at',
          'members.id'
        ].join(',')
      }})

      groups.forEach(this.updateFromServer)
    } catch(e){
      this.setIsError(getError(e))
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


export default new GroupStore()
