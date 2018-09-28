import _        from 'lodash'
import xhr      from 'helpers/XHR'
import getError from 'helpers/ErrorParser'
import uiStore  from 'stores/UiStore'
import {setter} from 'mobx-decorators'

import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

export class SMSInboxStore {
  @setter @observable isLoading = false
  @setter @observable isError = null
  @observable inbox = []

  constructor() {
    this.initAutoruns()
  }

  // Computed
  @computed
  get totalUnread() {
    return _.reduce(this.inbox, (sum, m) => sum + m.total_unread, 0)
  }

  // Actions
  @action
  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action
  autoErrorNotifier = () => {
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

  @action
  fetchInbox = async() => {
    try {
      this.setIsLoading(true)

      const res = await xhr.get('/commo/inbox', {
        params: {
          only: [
            'id',
            'conversation_id',
            'body',
            'media_url',
            'created_at',
            'direction',
            'read_status',
            'total_unread',
            'broker.id',
            'broker.contact.name',
            'broker.contact.phone',
            'broker.contact.id',
            'broker.contact.student.full_name',
            'broker.contact.student_id',
            'broker.contact.relationship',
            'broker.contact.flags_count'
          ].join(',')
        }
      })

      this.fetchInboxOK(res)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }


  @action.bound
  fetchInboxOK(res) {
    this.isLoading = false
    this.inbox     = res.data
  }
}

export default new SMSInboxStore()
