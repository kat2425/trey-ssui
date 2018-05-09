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
import uuid       from 'uuid'

export const GROUPS = {
  STUDENT: 'student',
  USER:    'user',
  ALL:     'all'
}

class GroupStore {
  @setter @observable isError       = false
  @setter @observable isMessage     = false
  @setter @observable isLoading     = false
  @setter @observable searchResults = null
  @setter @observable searchValue   = null
  @setter @observable isSearching   = false
  @observable originalGroup         = observable.map()
  @observable selectedGroup         = null
  
  // TODO: Ensure that this gets unset so that 
  // we don't end up with a weird case where the
  // user doesn't see groups somewhere else because
  // they've searched here.
  @setter @observable groupFilter     = ''
  @setter @observable groupTypeFilter = ''

  @setter @observable groups        = observable.map()
  @setter @observable activeTab     = GROUPS.ALL

  constructor(){
    this.initAutoruns()
  }

  // Computed
  @computed get orderedGroups() {
    let groups = _.orderBy(this.groups.values(), g => g.createdAt, 'desc')

    if (this.groupFilter) {
      groups = groups.filter(g => g.groupName.toLowerCase().indexOf(this.groupFilter.toLowerCase()) > -1)
    }

    if (this.activeTab !== 'all') {
      groups = groups.filter(g => g.groupType.toLowerCase() === this.activeTab)
    }
   
    return groups
  }
  
  @computed get userGroups() {
    let userGroups = this.groups.values().filter(g => g.groupType === 'user')

    return _.orderBy(userGroups, g => g.createdAt, 'desc')
  }

  @computed get isEmpty() {
    return !this.groups.size
  }

  @computed get shouldSearch() {
    if(!_.isEmpty(this.searchValue)) {
      return this.searchValue.length > 3 && !this.isSearching
    } else return false
  }

  // Actions
  @action initAutoruns = () => {
    this.autoErrorNotifier()
    this.autoMessager()
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

  @action autoMessager = () => {
    this.autoMessage = autorun('auto notify user', () => {
      if(this.isMessage) {
        uiStore.addMessage(this.isMessage.message, this.isMessage.type)
      }
    })
  }

  @action changeGroupFilter = (e) => {
    this.setActiveTab(e.target.value)
  }

  @action fetchGroups = async() => {
    const params = {
      only: [
        'id', 'created_at', 'group_name', 'group_type', 'member_count', 'description'
      ]
    }

    try{
      this.setIsLoading(true)
      this.setGroupFilter('')
      const {data:groups} = await xhr.get('/groups', params)
      
      groups.forEach(this.updateGroupFromServer)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action updateGroupFromServer = group => {
    this.addGroup(new Group({}, this, group))
  }

  @action getIdsFromNames = (names = []) => {
    return names.map(name => 
      this.groups.values().find(g => g.name === name)
    )
  }

  @action handleGroupFilter = ({target}) => {
    this.groupFilter = target.value
  }

  @action handleGroupTypeFilter = ({target}) => {
    this.groupTypeFilter = target.value
  }

  @action handleAddGroup = () => {
    this.addGroup(new Group({isNew: true}, this, {
      id:          uuid(), 
      group_type:  null, 
      group_name:  null, 
      description: ''
    }))
  }

  @action handleSearchOnChange = (event) => {
    this.setSearchValue(event.target.value)

    if(this.shouldSearch) {
      _.debounce(this.searchMembers(event.target.value), 300)
    }
  }

  @action searchMembers = async(searchValue) => {
    try {
      this.setIsSearching(true)
      const params = {
        query: searchValue,
        limit: 15
      }

      const { data } = await xhr.get(`/groups/${this.selectedGroup.id}/members/search`, { params })

      this.setSearchResults(data)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsSearching(false)
    }
  }

  @action addGroup = group => {
    if(this.groups.has(group.id)) return
    this.groups.set(group.id, group)
  }

  @action editTitleOnChange = event => {
    this.selectedGroup.groupName = event.target.value
  }

  @action editDescriptionOnChange = event => {
    this.selectedGroup.description = event.target.value
  }
}


export default new GroupStore()
