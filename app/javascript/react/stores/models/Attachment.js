import {
  observable,
  action,
  computed,
  autorun,
  runInAction
} from 'mobx'

import { setter } from 'mobx-decorators'
import uiStore    from 'stores/UiStore'
import getError   from 'helpers/ErrorParser'
import axios      from 'axios/index'
import xhr        from 'helpers/XHR'
import getFile    from 'js-file-download'

export default class Attachment {
  @observable id = null
  @observable studentID = null
  parentStore = null
  createdAt = null
  @observable filename = null
  @observable groups = null
  @observable modifiable = null
  @observable publicUrl = null
  @observable size = null
  @observable thumbnail = null
  @setter @observable visibility = null
  @setter @observable isLoading = null
  @setter @observable isDeleting = null
  @setter @observable isDownloading = null
  @setter @observable isError = null
  @setter @observable isRecording = false

  constructor(parentStore, json, id) {
    this.update(json)
    this.parentStore = parentStore
    this.studentID = id
    this.autoErrorNotifier()
  }

  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({title: this.isError.title, message: this.isError.message, type: 'error'})
      }
    })
  }

  @computed get humanSize() {
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']

    if (this.size === 0) return 'n/a'

    const i = parseInt(Math.floor(Math.log(this.size) / Math.log(1024)))

    return Math.round(this.size / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }

  @action downloadFile = async(url = this.publicUrl, filename = this.filename) => {
    try {
      this.setIsDownloading(true)
      const res = await axios.get(url, {responseType: 'blob'})

      getFile(res.data, filename)
      uiStore.addMessage(`${this.filename} downloaded successfully!`)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsDownloading(false)
    }
  }

  @action update = ({
    id,
    created_at,
    filename,
    groups,
    modifiable,
    public_url,
    size,
    thumbnail,
    visibility,
    'is_call_recording?' : isRecording
  }) => {
    this.id = id
    this.createdAt = created_at
    this.filename = filename
    this.groups = groups
    this.modifiable = modifiable
    this.publicUrl = public_url
    this.size = size
    this.thumbnail = thumbnail
    this.visibility = visibility
    this.setIsRecording(isRecording)
  }

  @action changeVisibility = async(visibility, groups = []) => {
    this.setIsLoading(true)

    const params = visibility === 'groups'
      ? { visibility: 'groups', groups: groups.join(',') }
      : { visibility }

    try {
      const { data } = await xhr.put(`/students/${this.studentID}/attachments/${this.id}`, params)

      this.update(data)
      uiStore.addMessage(`${this.filename} visibility changed successfully!`)
    }
    catch(e) {
      this.setIsError(getError(e))
    } finally {
      runInAction(() => {
        this.setIsLoading(false)
        this.setShowGroupsModal(false)
      })
    }
  }

  @action deleteAttachment = async() => {
    try {
      this.setIsDeleting(true)
      await xhr.delete(`/students/${this.studentID}/attachments/${this.id}`)

      this.deleteAttachmentOK()
      uiStore.addMessage(`Attachment deleted successfully!`)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsDeleting(false)
    }
  }

  @action deleteAttachmentOK() {
    this.parentStore.attachments.delete(this.id)
    this.parentStore.fetchAttachments(this.studentID)
  }

  @action setShowGroupsModal(isShowing) {
    this.parentStore.setShowGroupsModal(isShowing)
  }
}
