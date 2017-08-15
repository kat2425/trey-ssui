import { observable, action, computed, runInAction, autorun } from 'mobx'

import Faye from 'faye'
import xhr  from 'helpers/XHR'
import _    from 'lodash'

import SMSConversationStore from 'stores/SMSConversation'
import SMSInboxStore from 'stores/SMSInbox'

class WebSocketStore {
  constructor() {
    let fayeURL = 'https://api.schoolstatus.com/rt'

    this.faye = new Faye.Client(fayeURL, {
      timeout: 120
    })
  }

  @action
  subscribeUser(id) {
    this.faye.subscribe(`/user/${id}`, (msg) => {
      console.log('-- incoming ws msg')
      console.log(msg)

      if (msg.stream_type === 'sms_log') {
        const _msg = _.pick(msg,
          'id', 'conversation_id', 'body',
          'created_at', 'direction', 'media_url',
          'read_status', 'sent_state'
        )

        SMSConversationStore.addMessage(_msg)
        SMSInboxStore.fetchInbox()
      }
    })
  }
}

export default WebSocketStore = new WebSocketStore()
