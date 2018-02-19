import {
  observable,
  action,
  autorun
} from 'mobx'

import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import uiStore    from 'stores/UiStore'
import getError   from 'helpers/ErrorParser'
import _isEmpty   from 'lodash/isEmpty'

export class MailerStore {
  @setter @observable isError        = false
  @setter @observable isSendingEmail = false

  @observable visible                = false

  @observable name                   = undefined
  @observable conversationID         = null

  constructor() {
    this.initAutoruns()
  }

  // Autoruns
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
  fetchEmailAddress = async(type, id, name) => {
    this.name = name
    try {
      const res = await xhr.get('/commo/email/get_conversation', {
        params: {
          id:   id,
          type: type
        }
      })

      this.fetchEmailAddressOK(res)
    } catch(e) {
      this.setIsError(getError(e))
    }
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
  sendEmail = async({subject, body, fileList = [], onSuccess}) => {
    try {
      this.setIsSendingEmail(true)

      const res = await this.sendEmailEndPoint({
        conversation_id: this.conversationID,
        subject,
        body,
        fileList
      }) 

      onSuccess(res)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsSendingEmail(false)
    }
  }

  @action sendEmailEndPoint = async(params) => {
    if(!_isEmpty(params.fileList)){
      return await xhr.post('/commo/email', getAttachmentData(params), {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      return await xhr.post('/commo/email', params)
    }
  }
}

function getAttachmentData({conversation_id, subject, body,  fileList}){
  const data = new FormData()

  data.append('conversation_id', conversation_id)
  data.append('subject', subject)
  data.append('body', body)
  fileList.forEach(file => {
    data.append('attachments[][file]', file)
  })

  return data
}

export default new MailerStore()
