import {
  observable,
  action
} from 'mobx'

import { setter } from 'mobx-decorators'

export default class Group {
  id         = null
  groupStore = null
  createdAt  = null

  @setter @observable groupName   = null
  @setter @observable groupType   = null
  @setter @observable global      = false
  @setter @observable description = ''

  constructor(store){
    this.groupStore = store
  }

  @action updateFromJson = ({
    id,
    created_at: createdAt,
    group_name: groupName,
    group_type: groupType,
    description
  }) => {
    this.id          = id
    this.createdAt   = createdAt
    this.groupName   = groupName
    this.groupType   = groupType
    this.description = description
  }
}
