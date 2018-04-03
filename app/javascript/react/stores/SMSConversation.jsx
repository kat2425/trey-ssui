import { observable, action, computed } from 'mobx'

import _            from 'lodash'
import xhr          from 'helpers/XHR'

import { SIDEBAR }  from 'stores/UiStore'
import uiStore      from 'stores/UiStore'
import Conversation from 'stores/models/Conversation'
import Pager        from 'stores/models/Pager'

class SMSConversationStore {
  @observable limit         = 20
  @observable isLoading     = false
  @observable conversations = observable.map()
  @observable pagers        = observable.map()

  // Computed Values
  @computed
  get descMessages() {
    const conversation = this.getCurrentConversation()

    return conversation ? _.sortBy(conversation.messages.values(), m => m.createdAt) : []
  }

  @computed
  get shouldLoadMore(){
    const pager = this.getCurrentPager()

    if(this.isLoading || !pager || pager.isFilled) return false
    return true
  }

  // Actions
  @action
  addMessage = (msg) => {
    const conversation = this.conversations.get(msg.conversation_id)

    conversation && conversation.add(msg)
  }

  @action
  fetchConversation = (id) => {
    const pager = this.getCurrentPager()
    const limit = pager ? pager.limit : this.limit

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
            'contact.relationship',
            'language',
            'meta'
          ].join(','),
        limit: limit,
        page:  1
      }
    }).then(this.fetchConversationOK(id))
  }


  @action
  fetchConversationOK = id => ({headers, data}) => {
    this.isLoading = false

    this.updateConversation(id, data)
    this.updatePager(id, headers)
  }

  getConversationParams = (id, data) => ({
    id,
    store:    this,
    messages: data,
  })

  @action
  updateConversation = (id, data) => {
    const params       = this.getConversationParams(id, data)
    const conversation = this.conversations.get(id)

    conversation ?  conversation.updateMessages(data) : this.conversations.set(id, new Conversation(params))
  }

  @action
  initiateConversation = (contact) => {
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
    uiStore.setSelectedSidebar(SIDEBAR.SMS)
    uiStore.setShowInbox(false)
    uiStore.setSidebarMaxHeight(true)
  }

  @action
  sendMessage(msg, id, attachment) {
    if (attachment) {
      const data = this.getAttachmentData(msg, id, attachment)

      xhr.post('/commo/sms/send_message/contact', data, { 
        'Content-Type': 'multipart/form-data' 
      }).then(this.sendMessageOK)
    } else {
      xhr.post('/commo/sms/send_message/contact', {
        contact_id: id,
        body:       msg
      }).then(this.sendMessageOK)
    }
  }

  @action
  sendMessageOK = (response) => {
    this.addMessage(response.data)
  }

  @action
  setRead(id) {
    xhr.put(`/commo/sms_log/${id}/read`)
  }

  @action
  delete = (id) => {
    this.conversations.delete(id)
    this.pagers.delete(id)
  }

  getCurrentConversation = () => {
    return this.conversations.get(uiStore.currentConversation)
  }

  loadMore = () => {
    if(!this.shouldLoadMore) return

    // retrieve pager for the current conversation
    const pager = this.getCurrentPager()

    // increase limit to fetch more data
    pager.increment()

    // fetch more data
    this.fetchConversation(uiStore.currentConversation)

    uiStore.setShouldScrollToBottom(false)
  }

  getCurrentPager = () => {
    return this.pagers.get(uiStore.currentConversation)
  }

  updatePager = (id, headers) => {
    const pager = this.pagers.get(id)
    const total = parseInt(headers.total)

    if(pager){
      pager.setTotal(total)
    } else {
      this.pagers.set(id, new Pager(this.limit, total))
    }
  }

  getAttachmentData = (msg, id, attachment) => {
    const data = new FormData()

    data.append('contact_id', id)
    data.append('body',       msg)
    data.append('attachment', attachment)

    return data
  }
}

export default new SMSConversationStore()
