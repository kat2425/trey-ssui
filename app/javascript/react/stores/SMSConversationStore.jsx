import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import uuid          from 'uuid'
import _             from 'lodash'
import xhr           from 'helpers/XHR'
import intercomEvent from 'helpers/Intercom'

import { SIDEBAR }   from 'stores/UiStore'
import uiStore       from 'stores/UiStore'
import getError      from 'helpers/ErrorParser'
import { setter }    from 'mobx-decorators'
import Conversation  from 'stores/models/Conversation'
import Scroller      from 'stores/models/Scroller'

export class SMSConversationStore {
  @observable limit           = 20
  @observable isLoading       = false
  @observable conversations   = observable.map()
  @observable scrollers       = observable.map()
  @setter @observable isError = null

  constructor() {
    this.initAutoruns()
  }

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

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
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
  addMessage = (msg) => {
    const conversation = this.conversations.get(msg.conversation_id)

    conversation && conversation.add(msg)
  }

  @action
  removeMessage = (msg) => {
    const conversation = this.conversations.get(msg.conversationId)

    conversation && conversation.remove(msg)
  }

  @action
  fetchConversation = async(id) => {
    const scroller = this.getCurrentScroller()
    const limit = scroller ? scroller.limit : this.limit

    this.isLoading = true
    try {
      const res = await xhr.get(`/commo/sms/conversation/${id}`, {
        params: {
          only: [
            'id',
            'created_at',
            'conversation_id',
            'broadcast_id',
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
      })

      this.fetchConversationOK(id, res.headers, res.data)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.isLoading = false
    }
  }

  @action
  fetchConversationOK = (id, headers, data) => {
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
  initiateConversation = async(contact) => {
    try {
      const {data} = await xhr.post('/commo/conversations', {
        number:     contact.phone,
        contact_id: contact.id
      })

      this.initiateConversationOk(contact, data)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  initiateConversationOk = (contact, data) => {
    uiStore.setCurrentContact(contact)
    uiStore.setCurrentConversation(data.id)
    uiStore.setSelectedSidebar(SIDEBAR.SMS)
    uiStore.setShowInbox(false)
    uiStore.setSidebarMaxHeight(true)
  }

  @action
  sendMessage = (msg, id, attachment = null) => {
    intercomEvent('web:sms:send', {
      contact_id: id,
      attachment: (attachment ? true : false)
    })

    if (attachment) {
      this.sendWithAttachment(msg, id, attachment)
    } else {
      this.sendWithoutAttachment(msg, id)
    }
  }

  @action
  sendMessageOK = (response) => {
    this.addMessage(response.data)
  }

  getAttachmentData = (msg, id, attachment) => {
    const data = new FormData()

    data.append('contact_id', id)
    data.append('body',       msg)
    data.append('attachment', attachment)

    return data
  }

  @action
  sendWithAttachment = async(msg, id, attachment) => {
    const data = this.getAttachmentData(msg, id, attachment)

    try {
      const res = await xhr.post('/commo/sms/send_message/contact', data, {
        'Content-Type': 'multipart/form-data'
      })

      if(res.status === 201) {
        this.sendMessageOK(res)
        return
      } 

      throw new Error('Failed with attachment.')
    } catch(e) {
      this.handleFailedMessage(msg, attachment)
      this.setIsError(getError(e))
    }
  }

  @action
  sendWithoutAttachment = async(msg, id) => {
    try {
      const res = await xhr.post('/commo/sms/send_message/contact', {
        contact_id: id,
        body:       msg
      })

      if(res.status === 201) {
        this.sendMessageOK(res)
        return
      } 

      throw new Error('Failed without attachment.')
    } catch(e) {
      this.handleFailedMessage(msg)
      this.setIsError(getError(e))
    }
  }

  @action 
  handleFailedMessage = (msg, attachment = null) => {
    const _id = uuid()

    this.addMessage({ 
      id:              _id, 
      direction:       'outbound', 
      conversation_id: uiStore.currentConversation, 
      body:            msg,
      status:          'failed',
      contact:         uiStore.currentContact.id,
      media_url:       attachment ? URL.createObjectURL(attachment) : null,
      attachment
    })
  }

  @action
  retryMessage(msg) {
    if(msg.attachment) {
      this.retrySendMessageWithAttachment(msg)
    } else {
      this.retrySendMessage(msg)
    }
  }

  @action
  retrySendMessage = async(msg) => {
    try {
      msg.setStatus('retrying')
      const res = await xhr.post('/commo/sms/send_message/contact', {
        contact_id: msg.contact,
        body:       msg.body
      })

      if(res.status === 201) {
        this.removeMessage(msg)
        this.sendMessageOK(res)
        return
      } 
     
      throw new Error('Retry failed.')
    } catch(e) {
      msg.setStatus('failed')
      this.setIsError(getError(e))
    }
  }

  @action
  retrySendMessageWithAttachment = async(msg) => {
    try {
      const { contact, body, attachment } = msg
      const data = this.getAttachmentData(body, contact, attachment)
      
      msg.setStatus('retrying')
      const res = await xhr.post('/commo/sms/send_message/contact', data, {
        'Content-Type': 'multipart/form-data'
      })

      if(res.status === 201) {
        this.removeMessage(msg)
        this.sendMessageOK(res)
        return
      } 
     
      throw new Error('Retry failed.')
    } catch(e) {
      msg.setStatus('failed')
      this.setIsError(getError(e))
    }
  }

  @action
  setRead = async(id) => {
    try {
      await xhr.put(`/commo/sms_log/${id}/read`)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  setAllAsRead = async(conversationID) => {
    try {
      await xhr.post(`/commo/sms/conversation/${conversationID}/read`)
    } catch(e) {
      this.setIsError(getError(e))
    }
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
}

export default new SMSConversationStore()
