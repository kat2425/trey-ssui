import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import { setter }     from 'mobx-decorators'
import getError       from 'helpers/ErrorParser'
import uiStore        from 'stores/UiStore'
import broadcastStore from 'stores/BroadcastStore'
import xhr            from 'helpers/XHR'
import _              from 'lodash'

export class BroadcastDraft {
  static TOO_MANY = 100
  contacts       = null

  @setter @observable body              = ''
  @setter @observable recipients        = null
  @setter @observable query             = ''
  @setter @observable type              = 'group'
  @observable contactsCount             = observable.box(0)
  @setter @observable isSending         = false
  @setter @observable isSearching       = false
  @setter @observable isError           = false
  @setter @observable options           = []

  constructor(){
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

  @computed get isSendable() {
    if(_.isEmpty(this.body)) return false
    if(!this.contactsCount.get()) return false
    if(this.contactsCount.get() >= BroadcastDraft.TOO_MANY ) return false
    return true
  }

  @computed get isNoRecipients() {
    return _.isEmpty(this.recipients)
  }


  @action formatRecipients = () => {
    const typeSort = (formatted, recipient) => {
      if(recipient.group_name) {
        if(!formatted['groups']) formatted['groups'] = recipient.id
        else formatted['groups'] = `${formatted['groups']},${recipient.id}`
      }
      if(recipient.course_name) {
        if(!formatted['courses']) formatted['courses'] = recipient.id
        else formatted['courses'] = `${formatted['courses']},${recipient.id}`
      }
      if(recipient.name){
        if(!formatted['contacts']) formatted['contacts'] = recipient.id
        else formatted['contacts'] = `${formatted['contacts']},${recipient.id}`
      }
      return formatted
    }

    return this.recipients.reduce(typeSort, {})
  }

  @action fetchContactsCount = async() => {
    try {
      if(this.isNoRecipients) {
        this.contactsCount.set(0)
        return
      }
      const formattedRecipients = this.formatRecipients()

      const res = await xhr.post('commo/broadcast/count', formattedRecipients)

      this.contactsCount.set(res.data)
    } catch (err) {
      this.setIsError(getError(err))
    }
  }

  @action sendBroadcast = async() => {
    try {
      this.setIsSending(true)
      const params = {
        only: [
          'id',
          'body',
          'created_at',
          'user_id',
          'contacts_count',
          'students_count',
          'recipients',
          'students.id',
          'students.full_name',
          'students.avatar_url',
          'contacts.name',
          'contacts.id',
          'contacts.student_id',
          'contacts.student.full_name',
          'contacts.relationship'
        ].join(',')
      }

      const res = await xhr.post('/commo/broadcast/send', {
        ...this.formatRecipients(),
        body: this.body,
        params
      })

      this.sendBroadcastOk(res)
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      this.setIsSending(false)
    }
  }

  @action sendBroadcastOk = (res) => {
    uiStore.addMessage(`Broadcast message sent!`)

    broadcastStore.createBroadcast({
      ...res.data,
      recipients: this.addTypeToRecipients()
    })
  }

  @action addTypeToRecipient = (_recipient) => {
    const recipient = {..._recipient}

    if(recipient.group_name) {
      recipient.type = 'group'
      recipient.group = {group_name: recipient.group_name}
    }
    if(recipient.course_name) {
      recipient.type = 'course'
      recipient.course = {course_name: recipient.course_name }
    }
    if(recipient.name) {
      recipient.type = 'contact'
      recipient.contact = {contact_name: recipient.name}
    }

    return recipient
  }

  @action addTypeToRecipients = () => {
    return this.recipients.map(this.addTypeToRecipient)
  }

  @action updateQueryAndSearch = (query) => {
    this.setQuery(query || '')
    this.searchRecipients()
  }

  @action updateTypeAndSearch = (type) => {
    this.setType(type)
    this.searchRecipients()
  }

  @action searchRecipients = async() => {
    try {
      this.setIsSearching(true)
      this.setIsError(false)
      this.setOptions([])

      if(this.query.length < 4) return

      const res = await xhr.get(`/${this.type}s/search`, {
        params: {
          query: this.query,
          only:  [
            'id',
            'group_name',
            'name',
            'course_name',
            'relationship',
            'student.first_name',
            'student.last_name',
            'class_period',
            'term',
            'school_year'
          ].join(',')
        }
      })


      this.searchRecipientsOK(res)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsSearching(false)
    }
  }


  @action searchRecipientsOK = ({data = []} = {}) => {
    this.options = data
  }
}
