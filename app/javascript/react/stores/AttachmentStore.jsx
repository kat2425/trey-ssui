import {
  observable,
  action,
  autorun,
  computed
} from 'mobx'

import { setter }     from 'mobx-decorators'
import xhr            from 'helpers/XHR'
import uiStore        from 'stores/UiStore'
import getError       from 'helpers/ErrorParser'
import Attachment     from 'stores/models/Attachment'
import _              from 'lodash'
import intercomEvent  from 'helpers/Intercom'

export class AttachmentStore {
  @setter @observable isLoading          = false
  @setter @observable isUploading        = false
  @setter @observable isError            = false
  @setter @observable attachments        = observable.map()
  @setter @observable showGroupsModal    = false
  @setter @observable selectedAttachment = null

  contructor(){
    this.initAutoruns()
  }

  // Computed
  @computed get hasErrors(){
    return !this.isLoading && this.isError
  }

  @computed get orderedAttachments(){
    return _.orderBy(this.attachments.values(), t => t.createdAt, 'desc')
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

  @action clearData = () => {
    this.attachments.clear()
  }

  @action fetchAttachments = async(id) => {
    try {
      this.clearData()
      this.setIsLoading(true)
      this.setIsError(false)

      const response = await xhr.get(`/students/${id}/attachments`, {
        params: {
          only: [
            'id', 'filename', 'public_url', 'created_at', 'thumbnail', 'modifiable',
            'visibility', 'is_call_recording?', 'size', 'groups.group_name', 'groups.id'
          ].join(',')
        }
      })

      this.fetchAttachmentsOK(response, id)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  fetchAttachmentsOK(res, id) {
    res.data.forEach((r) => {this.attachments.set(r.id, new Attachment(this, r, id))})
  }

  @action uploadFile = async(studentID, filename, attachment) => {
    intercomEvent('web:student_card:attachments:add_attachment', {
      student_id: studentID,
      filename:   filename
    })

    this.setIsUploading(true)
    this.setIsError(false)

    const data = this.getAttachmentRequestData(filename, attachment)

    try{
      const response = await xhr.post(`/students/${studentID}/attachments`, data, {
        'Content-Type': 'multipart/form-data'
      })

      uiStore.addMessage(`${filename} uploaded successfully!`)
      this.uploadFileOK(response, studentID)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsUploading(false)
    }
  }

  @action uploadFileOK(response, studentID) {
    this.fetchAttachments(studentID)
  }

  @action getAttachmentRequestData = (filename, attachment) => {
    const data = new FormData()

    data.append('filename', filename)
    data.append('attachment', attachment)

    return data
  }

  @action dispose = () => {
    this.autoErrorNotifier && this.autoErrorNotifier()
  }
}


export default new AttachmentStore()
