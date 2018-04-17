import {
  observable,
  action,
  computed
} from 'mobx'

import _            from 'lodash'
import xhr          from 'helpers/XHR'

import { SIDEBAR }  from 'stores/UiStore'
import uiStore      from 'stores/UiStore'
import { setter }   from 'mobx-decorators'
import Conversation from 'stores/models/Conversation'
import Scroller     from 'stores/models/Scroller'

export class SMSConversationStore {
  @observable limit           = 20
  @observable isLoading       = false
  @observable conversations   = observable.map()
  @observable scrollers       = observable.map()
  @setter @observable isError = null

  // Computed Values
  @computed
  get descMessages() {
    const conversation = this.getCurrentConversation()

    return conversation ? _.sortBy(conversation.messages.values(), m => m.createdAt) : []
  }

  @computed
  get shouldLoadMore(){
    const scroller = this.getCurrentScroller()

    if(this.isLoading || !scroller || scroller.isFilled) return false
    return true
  }

  // Actions
  @action
  addMessage = (msg) => {
    const conversation = this.conversations.get(msg.conversation_id)

    conversation && conversation.add(msg)
  }

  @action
  fetchConversation = async(id) => {
    const scroller = this.getCurrentScroller()
    const limit = scroller ? scroller.limit : this.limit

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
    this.updateScroller(id, headers)
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
  setAllAsRead(conversationID) {
    xhr.post(`/commo/sms/conversation/${conversationID}/read`)
  }

  @action
  delete = (id) => {
    this.conversations.delete(id)
    this.scrollers.delete(id)
  }

  getCurrentConversation = () => {
    return this.conversations.get(uiStore.currentConversation)
  }

  loadMore = () => {
    if(!this.shouldLoadMore) return

    // retrieve scroller for the current conversation
    const scroller = this.getCurrentScroller()

    // increase limit to fetch more data
    scroller.increment()

    // fetch more data
    this.fetchConversation(uiStore.currentConversation)

    uiStore.setShouldScrollToBottom(false)
  }

  getCurrentScroller = () => {
    return this.scrollers.get(uiStore.currentConversation)
  }

  updateScroller = (id, headers) => {
    const scroller = this.scrollers.get(id)
    const total = parseInt(headers.total)

    if(scroller){
      scroller.setTotal(total)
    } else {
      this.scrollers.set(id, new Scroller(this.limit, total))
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
