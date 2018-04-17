import {  action }          from 'mobx'
import Faye                 from 'faye'

import smsConversationStore from 'stores/SMSConversation'
import smsInboxStore        from 'stores/SMSInboxStore'
import uiStore              from 'stores/UiStore'

const fayeURL = 'https://api.schoolstatus.com/rt'

export class WebSocketStore {
  faye = null

  constructor() {
    this.faye = new Faye.Client(fayeURL, {
      timeout: 120
    })
  }

  @action
  subscribeUser = (id) => {
    this.faye.subscribe(`/user/${id}`, (msg) => {
      if (msg.stream_type === 'sms_log') {
        smsConversationStore.addMessage(msg)
        smsInboxStore.fetchInbox()
        uiStore.setShouldScrollToBottom(true)
      }
    })
  }
}

export default new WebSocketStore()
