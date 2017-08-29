import { observable, action, computed, runInAction, autorun } from 'mobx'

import _   from 'lodash'
import xhr from 'helpers/XHR'

class SMSConversationStore {
  @observable isLoading = false
  @observable messages  = []

  @action
  fetchConversation(id) {
    this.isLoading = true

    xhr.get(`/commo/sms/conversation/${id}`, {
      params: {
        only:
          [
            'id',
            'created_at',
            'conversation_id',
            'direction',
            'sent_state',
            'body',
            'media_url',
            'read_status',
            'contact.id',
            'contact.name',
            'contact.phone',
            'contact.relationship'
          ].join(','),
        limit: 30,
        page:  1
      }
    }).then(::this.fetchConversationOK)
  }

  @action.bound
  fetchConversationOK(res) {
    this.isLoading = false
    this.messages  = res.data
  }

  @action
  sendMessage(msg, id) {
    xhr.post('/commo/sms/send_message/contact', {
      contact_id: id,
      body:       msg
    })
  }

  @action
  setRead(id) {
    xhr.put(`/commo/sms_log/${id}/read`)
  }

  @computed
  get descMessages() {
    return _.sortBy(this.messages, m => m.created_at)
  }

  addMessage(msg) {
    if (!_.find(this.messages, m => m.id === msg.id)) {
      this.messages.push(msg)
    }
  }
}

export default SMSConversationStore = new SMSConversationStore()

// /commo/sms/conversation/4553dec9-9b09-4d33-a3af-a41746cc70fa?only=id,conversation_id,direction,sent_state,body,media_url,read_status,contact.id,contact.name
