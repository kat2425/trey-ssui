import { observable, action, computed } from 'mobx'
import _   from 'lodash'
import xhr from 'helpers/XHR'

import uiStore from 'stores/UiStore'

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
    }).then(this.fetchConversationOK)
  }

  @action.bound
  fetchConversationOK(res) {
    this.isLoading = false
    this.messages  = res.data
  }

  @action
  initiateConversation = (contact, callback) => {
    return xhr.post('/commo/conversations', {
      number:     contact.phone,
      contact_id: contact.id
    })
      .then(res => res.data)
      .then(this.initiateConversationOk(contact))
  }

  @action
  initiateConversationOk = contact => ({id}) => {
    uiStore.setCurrentContact(contact)
    uiStore.setCurrentConversation(id)
    uiStore.setSidebarVisibility(true)
    uiStore.setShowInbox(false)
    uiStore.setSidebarMaxHeight(true)
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

  @action
  addMessage(msg) {
    if (!_.find(this.messages, m => m.id === msg.id)) {
      this.messages.push(msg)
    }
  }
}

export default SMSConversationStore = new SMSConversationStore()
