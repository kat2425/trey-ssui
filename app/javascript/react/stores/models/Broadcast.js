import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import { setter } from 'mobx-decorators'
import DateFormat from 'helpers/DateFormat'
import uiStore    from 'stores/UiStore'
import _          from 'lodash'

export default class Broadcast {
  broadcastStore                    = null
  @observable id                    = null
  @observable contacts              = null
  @observable createdAt             = null
  @observable students              = null
  @observable studentsCount         = null
  @observable nameArray             = []
  @observable contactsCount         = null
  @setter @observable body          = null
  @setter @observable recipients    = null
  @setter @observable isNew         = false
  @setter @observable action        = null
  @setter @observable isLoading     = false
  @setter @observable isTranslating = false
  @setter @observable isError       = false

  constructor(store, json){
    this.broadcastStore = store
    this.update(json)
    this.initAutoruns()
  }

  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    'error'
        })
      }
    })
  }

  @computed get fullDate(){
    return `${DateFormat.fullDate(this.createdAt)} at ${DateFormat.time12Hour(this.createdAt)}`
  }

  @computed get timeAgo(){
    return DateFormat.timeAgo(this.createdAt)
  }

  @computed get recipientName() {
    if(this.nameArray.length === 1) return this.nameArray[0]
    if(this.nameArray.length === 2) return `${this.nameArray[0]} and ${this.nameArray[1]}`
    if(this.nameArray.length === 3) {
      return `${this.nameArray[0]}, ${this.nameArray[1]}, and ${this.nameArray[2]}`
    }
    return 'Unknown Contacts'
  }

  @computed get isSelected(){
    return this.broadcastStore.selectedBroadcast === this
  }

  @action getRecipientName = () => {
    const recipientsByType = _.groupBy(this.recipients, 'type')

    if(!_.isEmpty(recipientsByType.group)) {
      if(recipientsByType.group.length === 1){
        this.nameArray.push(_.get(recipientsByType, 'group[0].group.group_name', 'Unknown Group'))
      } else {
        this.nameArray.push(`${recipientsByType.group.length} groups`)
      }
    }

    if(!_.isEmpty(recipientsByType.course)) {
      if(recipientsByType.course.length === 1) {
        this.nameArray.push(_.get(recipientsByType, 'course[0].course.course_name', 'Unknown Course'))
      } else {
        this.nameArray.push(`${recipientsByType.course.length} courses`)
      }
    }

    if(!_.isEmpty(recipientsByType.contact)) {
      if(recipientsByType.contact.length === 1){
        this.nameArray.push(_.get(recipientsByType, 'contact[0].contact.name', ''))
      } else {
        this.nameArray.push(`${recipientsByType.contact.length} contacts`)
      }
    }
  }

  @action handleSelect = () => {
    this.broadcastStore.setSelectedBroadcast(this)
    uiStore.setShowBroadcastInfo(true)
  }

  @action update = ({
    id,
    body,
    contacts,
    students,
    isNew,
    user_id:        userId,
    created_at:     createdAt,
    recipients:     recipients,
    contacts_count: contactsCount,
    students_count: studentsCount
  }) => {
    this.id         = id
    this.body       = body
    this.contacts   = contacts
    this.isNew      = isNew
    this.students   = students
    this.userId     = userId
    this.createdAt  = createdAt
    this.recipients = recipients
    this.contactsCount = contactsCount
    this.studentsCount = studentsCount
    this.getRecipientName()
  }
}
