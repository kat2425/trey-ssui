import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx'

import xhr           from 'helpers/XHR'

import { setter }    from 'mobx-decorators'

import Pagination    from 'stores/models/Pagination'
import _             from 'lodash'
import moment        from 'moment'
import getError      from 'helpers/ErrorParser'
import userStore     from 'stores/UserStore'

export default class Group {
  id         = null
  groupStore = null

  @observable groupName                     = null
  @observable parentGroup                   = null
  @observable createdBy                     = null
  @observable createdAt                     = null
  @observable memberIDs                     = null

  @setter @observable groupType             = null
  @setter @observable global                = false
  @setter @observable description           = ''
  @setter @observable memberCount           = null
  @setter @observable members               = observable.map()
  @setter @observable isSaving              = false
  @setter @observable isUpdating            = false
  @setter @observable isEditing             = false
  @setter @observable isFetchingMembers     = false
  @setter @observable isNew                 = false
  @setter @observable unconfirmedTypeChange = false
  @setter @observable selectedType          = null
  @setter @observable selectedScope         = null

  @observable pagination = new Pagination(this)

  constructor(conf = {}, parentStore, json = {}){
    this.init(conf, parentStore, json)
  }
  
  @computed get isActive(){
    return this.groupStore.selectedGroup === this
  }

  @computed get paginationParams(){
    return {
      page:  this.pagination.current,
      limit: this.pagination.pageSize
    }
  }

  @computed get isSelectingParentGroup(){
    return this.selectedScope === 'group'
  }
  
  @computed get hasMembers(){
    return this.members.values().length > 0
  }

  @computed get memberIDList() {
    return this.members.values().map(m => m.id).join(',')
  }

  @computed get isEditable() {
    if (this.groupType === 'user') {
      return userStore.hasModules('user_group_admin')
    } else {
      return userStore.hasModules('student_group_admin')
    }
  }

  @action init = (
    {isNew = false} = {},
    parentStore, 
    json
  ) => {
    this.isNew = isNew
    this.groupStore  = parentStore
    !_.isEmpty(json) && this.updateFromJson({...json})
    if(this.isNew) {
      this.createdAt = moment().format()
      this.setActive()
    }
  }

  @action setActive = () => {
    this.groupStore.selectedGroup = this
  }

  @action fetchMembers = async() => {
    if(!this.isNew) {
      try {
        this.setIsFetchingMembers(true)
        const params = {
          page:  this.pagination.current,
          limit: this.pagination.pageSize
        }
        const { headers, data } = await xhr.get(`/groups/${this.id}/members`, { params })

        runInAction(() => {
          this.members.clear()
          data.forEach((member) => {
            if (this.members.has(member.id)) return
            this.members.set(member.id, member)
          })
          this.setPagination(headers)
        })
      } catch (e) {
        this.groupStore.setIsError(getError(e))
      } finally {
        this.setIsFetchingMembers(false)
      }
    }
  }

  
  @action addMembers = (members) => {
    members.forEach((member) => {
      if (this.members.has(member.id)) return

      this.members.set(member.id, 
        {
          id:          member.id, 
          full_name:   member.full_name || `${member.first_name} ${member.last_name}`, 
          grade:       member.grade || null, 
          school_name: member.school_name ? member.school_name : null,
          username:    member.username || null
        }
      )
    })
  }

  @action removeMember = (member) => {
    this.members.delete(member.id)
  }

  @action handleTypeOnChange = () => {
    if(this.members.values().length > 0) {
      this.setUnconfirmedTypeChange(true)
      return
    }

    this.setGroupType(this.selectedType)  
  }

  @action handleScopeOnChange = (e) => {
    this.setSelectedScope(e)
  }

  @action confirmTypeChange = () => {
    this.members.clear()
    this.setGroupType(this.selectedType)  
    this.setUnconfirmedTypeChange(false)
  }

  @action handleOnCancelCreate = () => {
    this.groupStore.groups.delete(this.id)
    this.groupStore.selectedGroup = this.groupStore.orderedGroups[0]
  }

  @action handleOnEditClick = () => {
    this.setIsEditing(true)
    this.groupStore.originalGroup.set(this.id, this)
  }

  @action handleOnCancelEdit = () => {
    const {selectedGroup, originalGroup} = this.groupStore

    selectedGroup.groupName = originalGroup.get(this.id).groupName
    selectedGroup.description  = originalGroup.get(this.id).description

    originalGroup.delete(this.id)
    this.setIsEditing(false)
  }

  @action saveGroup = async() => { 
    if(!this.isGroupValid()) return

    this.setIsSaving(true)
    const params = {
      group_name:  this.groupName,
      group_type:  this.groupType,
      description: this.description,
      group_id:    this.parentGroup ? (this.parentGroup || this.parentGroup.key) : null,
      member_id:   this.memberIDList
    }

    try {
      const { data } = await xhr.post(`/groups`, params)

      this.updateFromJson(data)
      this.saveGroupOk()
    } catch(error) {
      this.groupStore.setIsError(getError(error))  
    } finally {
      this.setIsSaving(false)
    }
  }

  @action saveGroupOk = () => {
    this.setIsNew(false)
  }

  @action deleteGroup = async() => {
    try {
      await xhr.delete(`/groups/${this.id}`)
      this.deleteGroupOk(this.id)
    } catch(error) {
      this.groupStore.setIsError(getError(error))
    }
  }

  @action deleteGroupOk = (id) => {
    this.groupStore.groups.delete(id)
    this.groupStore.selectedGroup = null
  }

  @action updateGroup = async() => {
    if(!this.isGroupValid()) return

    this.setIsUpdating(true)
    const params = {
      group_name:  this.groupName,
      description: this.description, 
      group_id:    this.parentGroup ? (this.parentGroup || this.parentGroup.key) : null,
      member_id:   this.memberIDList
    }

    try {
      const {data} = await xhr.put(`/groups/${this.id}`, params)

      this.updateFromJson(data)
    } catch (error) {
      this.groupStore.setIsError(getError(error))    
    } finally {
      runInAction(() => {
        this.setIsEditing(false)
        this.setIsUpdating(false)
      })
    }
  }

  @action updateGroupOk = (data) => { 
    this.updateFromJson(data)
  }


  @action handleOnParentGroupChange = (id) => {
    this.parentGroup = id
  }

  @action updateFromJson = ({
    id,
    created_at:   createdAt,
    group_name:   groupName,
    group_type:   groupType,
    member_count: memberCount,
    description,
    group_id:     parentGroup,
    member_id:    memberIDs
  }) => {
    this.id          = id
    this.createdAt   = createdAt
    this.groupName   = groupName
    this.groupType   = groupType
    this.description = description
    this.memberCount = memberCount
    this.parentGroup = parentGroup
    this.memberIDs   = memberIDs

    this.selectedScope = this.parentGroup ? 'group' : 'owner-and-members'
  }

  @action setPagination = ({total}) => {
    this.pagination.setTotal(parseInt(total))
    this.pagination.calculateTotal
  }

  @action onPageChange = () => {
    this.fetchMembers()
  }

  @action isGroupValid = () => {
    if(!this.hasMembers) {
      this.groupStore.setIsError({title: 'Error', message: 'You must add members to the group!'})
      return false
    }

    if(!this.groupName) {
      this.groupStore.setIsError({title: 'Error', message: 'You must add a title!'})
      return false
    }

    if(!this.selectedScope) {
      this.groupStore.setIsError({title: 'Error', message: 'You must select a group visibility!'})
      return false
    }

    if(!this.groupType) {
      this.groupStore.setIsError({title: 'Error', message: 'You must select a group type!'})
      return false
    }

    return true
  }
}