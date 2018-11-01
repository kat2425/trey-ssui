import { action, computed } from 'mobx'
import DateFormat           from 'helpers/DateFormat'

export default class Flag {
  id           = null
  createdAt    = null
  updatedAt    = null
  deletedAt    = null
  note         = ''
  userFullName = null
  userId       = null

  parentStore  = null

  constructor(parentStore, json) {
    this.parentStore = parentStore
    this.updateFromServer(json)
  }

  @computed get creator() {
    return this.userFullName
  }

  @computed get createdDate(){
    return DateFormat.shortDateTime(this.createdAt)
  }

  @computed get updatedDate(){
    return DateFormat.shortDateTime(this.updatedAt)
  }

  @computed get deletedDate(){
    return DateFormat.shortDateTime(this.deletedAt)
  }

  @computed get toJS(){
    return {
      id:          this.id,
      creator:     this.creator,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
      userId:      this.userId,
      note:        this.note
    }
  }

  @action updateFromServer = ({
    id,
    created_at: createdAt,
    updated_at: updatedAt,
    deleted_at: deletedAt,
    note,
    user_full_name: userFullName,
    user_id: userId
  }) => {
    this.id           = id
    this.createdAt    = createdAt
    this.userFullName = userFullName
    this.userId       = userId
    this.note         = note
    this.deletedAt    = deletedAt
    this.updatedAt    = updatedAt
  }
}
