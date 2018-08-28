import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx'

import xhr         from 'helpers/XHR'

import { setter }  from 'mobx-decorators'

import Pagination  from 'stores/models/Pagination'
import _           from 'lodash'
import moment      from 'moment'
import getError    from 'helpers/ErrorParser'
import userStore   from 'stores/UserStore'
import { 
  USER_GROUP_ADMIN,
  STUDENT_GROUP_ADMIN
} from 'helpers/UserModules'

export default class Group {
  id                  = null
  groupStore          = null
  originalName        = null
  originalDescription = null
  originalType        = null
  originalMembers     = null
  originalScope       = null

  @observable groupName                     = null
  @observable parentGroup                   = null
  @observable parentGroupID                 = null
  @observable createdBy                     = null
  @observable createdAt                     = null
  @observable updatedAt                     = null
  @observable memberIDs                     = null
  @observable memberCount                   = null
  @observable childGroups                   = null

  @setter @observable groupType             = null
  @setter @observable description           = ''
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

  @computed get memberParams(){
    return {
      page:  this.pagination.current,
      limit: this.pagination.pageSize,
      only:  ['full_name', 'school.school_name', 'grade', 'id', 'username'].join(',')
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
      return userStore.hasModules(USER_GROUP_ADMIN)
    } else {
      return userStore.hasModules(STUDENT_GROUP_ADMIN)
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
    this.pagination.clear()
    this.groupStore.selectedGroup = this
  }

  @action fetchMembers = async() => {
    if(!this.isNew) {
      try {
        this.setIsFetchingMembers(true)
        const response = await xhr.get(`/groups/${this.id}/members`, { params: this.memberParams })

        this.fetchMembersOk(response)
      } catch (e) {
        this.groupStore.setIsError(getError(e))
      } finally {
        this.setIsFetchingMembers(false)
      }
    }
  }

  @action fetchMembersOk = ({data, headers}) => {
    this.members.clear()
    this.setPagination(headers)
    data.forEach(this.updateMembersFromServer)
  }

  @action loadMoreMembers = async() => {
    if(!this.isNew && !this.isFetchingMembers) {
      try {
        const { data } = await xhr.get(`/groups/${this.id}/members`, { params: this.memberParams })

        this.loadMoreMembersOk(data)
      } catch (e) {
        this.groupStore.setIsError(getError(e))
      } finally {
        this.setIsFetchingMembers(false)
      }
    }
  }

  @action loadMoreMembersOk = (data) => {
    this.setIsFetchingMembers(true)
    this.pagination.setCurrent(this.pagination.current + 1)
    data.forEach(this.updateMembersFromServer)
  }

  @action updateMembersFromServer = (member) => {
    if (this.members.has(member.id)) return
    this.members.set(member.id, member)
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
    this.setSelectedScope(null)
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
    this.groupStore.selectedGroup = null
  }

  @action handleOnEditClick = () => {
    this.setIsEditing(true)
    this.setOriginal()
  }

  @action handleOnCancelEdit = () => {
    this.setIsEditing(false)
    this.revertToOriginal()
  }

  @action setOriginal = () => {
    const {originalGroup} = this.groupStore

    originalGroup.set(this.id, this)

    this.originalName        = originalGroup.get(this.id).groupName
    this.originalDescription = originalGroup.get(this.id).description
    this.originalType        = originalGroup.get(this.id).groupType
    this.originalMembers     = originalGroup.get(this.id).members.values()
    this.originalScope       = originalGroup.get(this.id).selectedScope
  }

  @action revertToOriginal = () => {
    const {selectedGroup, originalGroup} = this.groupStore

    selectedGroup.groupName     = this.originalName
    selectedGroup.description   = this.originalDescription
    selectedGroup.selectedScope = this.originalScope
    
    selectedGroup.setGroupType(this.originalType)

    selectedGroup.members.clear()

    this.originalMembers.forEach((m) => {
      selectedGroup.members.set(m.id, m)
    })

    originalGroup.delete(this.id)
  }

  @action saveGroup = async() => { 
    if(!this.isGroupValid()) return

    this.setIsSaving(true)
    const params = {
      group_name:  this.groupName,
      group_type:  this.groupType,
      description: this.description,
      group_id:    this.parentGroupID ? this.parentGroupID.key : this.parentGroupID,
      member_id:   this.memberIDList
    }

    try {
      const { data } = await xhr.post(`/groups`, params)

      this.saveGroupOk(data)
    } catch(error) {
      this.groupStore.setIsError(getError(error))  
    } finally {
      this.setIsSaving(false)
    }
  }

  @action saveGroupOk = (data) => {
    const { selectedGroup, groups } = this.groupStore

    const group = groups.get(this.id)
    const oldID = selectedGroup.id

    this.setIsNew(false)
    this.updateFromJson(data)
    groups.delete(oldID)
    groups.set(group.id, group)
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
      group_id:    this.parentGroupID ? this.parentGroupID.key : this.parentGroupID,
      member_id:   this.memberIDList,
      group_type:  this.groupType
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
    this.parentGroupID = id
  }

  @action updateFromJson = ({
    id,
    created_at:   createdAt,
    updated_at:   updatedAt,
    creator:      createdBy,
    group_name:   groupName,
    group_type:   groupType,
    member_count: memberCount,
    description,
    group_id:     parentGroupID,
    member_id:    memberIDs,
    child_groups: childGroups,
    parent_group: parentGroup
  }) => {
    this.id            = id
    this.createdAt     = createdAt
    this.updatedAt     = updatedAt
    this.groupName     = groupName || ''
    this.description   = description
    this.memberCount   = memberCount
    this.parentGroupID = parentGroupID
    this.parentGroup   = parentGroup
    this.childGroups   = childGroups
    this.memberIDs     = memberIDs
    this.createdBy     = createdBy ? createdBy.full_name : null
    this.selectedScope = this.parentGroupID ? 'group' : 'owner-and-members'
    this.setGroupType(groupType)
    
    this.selectedScope = this.parentGroup
      ? 'group' 
      : !this.isNew
        ? 'owner-and-members'
        : null
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

    if(!this.selectedScope && this.groupType === 'student') {
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
