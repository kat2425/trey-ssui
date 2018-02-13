import { observable, action, computed } from 'mobx'

import _             from 'lodash'
import xhr           from 'helpers/XHR'

export class MailerStore {
  @observable visible = false

  @observable name           = undefined
  @observable conversationID = null

  @action
  fetchEmailAddress(type, id, name) {
    this.name = name

    xhr.get('/commo/email/get_conversation', {
      params: {
        id:   id,
        type: type
      }
    }).then(this.fetchEmailAddressOK)
  }

  @action.bound
  fetchEmailAddressOK(res) {
    this.visible        = true
    this.conversationID = res.data.id
  }

  @action.bound
  hideMailer() {
    this.visible        = false
    this.name           = undefined
    this.conversationID = null
  }

  @action
  sendEmail(subject, body, onSuccess) {
    xhr.post('/commo/email', {
      conversation_id: this.conversationID,
      subject:         subject,
      body:            body
    }).then(onSuccess)
  }
}

export default new MailerStore()
