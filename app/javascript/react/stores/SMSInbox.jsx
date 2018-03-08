import { observable, action, computed, runInAction, autorun } from 'mobx'

import _   from 'lodash'
import xhr from 'helpers/XHR'

class SMSInboxStore {
  @observable isLoading = false
  @observable inbox = []

  @action
  fetchInbox() {
    this.isLoading = true

    xhr.get('/commo/inbox', {
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
        ].join(',')
      }
    }).then(::this.fetchInboxOK)
  }

  @action.bound
  fetchInboxOK(res) {
    this.isLoading = false
    this.inbox     = res.data
  }

  @computed
  get totalUnread() {
    return _.reduce(this.inbox, (sum, m) => sum + m.total_unread, 0)
  }
}

export default SMSInboxStore = new SMSInboxStore()
