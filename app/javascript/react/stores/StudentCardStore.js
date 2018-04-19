import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import _             from 'lodash'
import xhr           from 'helpers/XHR'
import { setter }    from 'mobx-decorators'
import getError      from 'helpers/ErrorParser'
import uiStore       from 'stores/UiStore'
import intercomEvent from 'helpers/Intercom'

export class StudentCardStore {
  @setter @observable isLoading = false
  @observable visible           = false
  @observable viewport          = 'overview'

  @observable student           = null
  @observable contacts          = []
  @observable attachments       = []
  @setter @observable isError   = null

  constructor() {
    this.initAutoruns()
  }


  // Computed
  @computed
  get groupedContacts() {
    return _.map(_.groupBy(this.contacts, c => [ c.name, c.relationship ]), group =>
      ({
        name:         group[0].name,
        relationship: group[0].relationship,
        refs:         _.map(group, (g, i) => _.merge(g, {index: i}))
      })
    )
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  // Actions
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

  @action hasDataRelation = (relation) => {
    return _.includes(this.student.data_relations, relation)
  }

  @action
  fetchStudent = async(id) => {
    this.setIsLoading(true)
    this.visible        = false
    this.student        = null
    this.contacts.clear()

    try {
      const res = await xhr.get(`/students/${id}`, {
        params: {
          channel_stats:  true,
          list_relations: true,

          only: [
            'id', 'sis_id', 'state_id', 'first_name', 'last_name', 'dob',
            'gender', 'race', 'address', 'city', 'state', 'zip',
            'enrollment_status', 'grade', 'school.school_name', 'data_relations',
            'major', 'advisor', 'coach', 'channel_stats', 'flags', 'full_name'
          ].join(',')
        }
      })

      this.fetchStudentOK(res)
    } catch(e) {
      this.setisError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }


  @action.bound
  fetchStudentOK(res) {
    this.fetchStudentContacts(res.data.id)
    this.fetchAttachments(res.data.id)

    this.student = res.data
  }

  @action
  fetchStudentContacts = async(id) => {
    try {
      const res = await xhr.get(`/students/${id}/contacts`, {
        params: {
          only: [
            'id', 'student_id', 'name', 'phone', 'email', 'primary',
            'relationship', 'resides_with', 'checkout', 'emergency', 'no_contact',
            'stopped', 'student.full_name'
          ].join(',')
        }
      })

      this.fetchStudentContactsOK(res)
    } catch (e) {
      this.setIsError(getError(e))
    }
  }


  @action.bound
  fetchStudentContactsOK(res) {
    this.contacts  = res.data
    this.contacts.map(d => this.fetchNumberCapability(d))

    this.setIsLoading(false)
    this.visible   = true
  }

  @action
  fetchNumberCapability = async(contact) => {
    try {
      const res = await xhr.post('/commo/validate_number', {
        number: contact.phone
      })

      this.fetchNumberCapabilityOK(contact, res)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  fetchNumberCapabilityOK(contact, res) {
    this.contacts = this.contacts.map(c => {
      if (c.id === contact.id) { c.number_type = res.data.type }
      return c
    })
  }

  @action
  toggleContactPrimary = async(id, bool) => {
    try {
      const res = await xhr.put(`/contacts/${id}/primary`, {
        primary: bool
      })

      this.toggleContactPrimaryOK(res, bool)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action.bound
  toggleContactPrimaryOK(res, bool) {
    const index = _.findIndex(this.contacts, function(c) {
      return c.id === res.data.id 
    })
    
    this.contacts[index].primary = bool
  }


  @action
  triggerNativeMailTo = async(id) => {
    try {
      const res = xhr.get('/commo/email/get_conversation', {
        params: {
          id:   id,
          type: 'individual'
        }
      })

      this.openMailTo(res)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  openMailTo(res) {
    const _contact = _.find(this.contacts, c => c.id === res.data.reference_id)
    const _mailto = encodeURIComponent(`${_contact.name.replace(/,/g, '')} <${res.data.email_link}>`)
    const _gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${_mailto}`

    window.studentCardMailer.location.href = _gmail
    window.studentCardMailer.focus()
  }

  @action
  printStudentCard = () => {
    window.open(this.getPrintURL(this.student.id))
  }

  @action
  getPrintURL = (id) => {
    return [
      'https://jasper.schoolstatus.com/',
      'jasperserver-pro/rest_v2/reports/public/VJS/',
      'ss_ui/students/printed_student_card.pdf?',
      'student_id=', id, '&school_year=2018'
    ].join('')
  }

  @action
  hideCard() {
    this.visible = false
    this.student = null
    this.contacts.clear()
  }

  @action
  uploadFile = async(filename, attachment) => {
    intercomEvent('web:student_card:attachments:add_attachment', {
      student_id: this.student.id,
      filename:   filename
    })

    const data = this.getAttachmentData(filename, attachment)

    try {
      await xhr.post(`/students/${this.student.id}/attachments`, data, {
        'Content-Type': 'multipart/form-data'
      })

      this.uploadFileOK()
    } catch(e){
      this.setIsError(getError(e))
    }
  }

  @action.bound
  uploadFileOK() {
    this.fetchAttachments(this.student.id)
  }

  @action
  deleteAttachment = async(bucketID) => {
    try {
      await xhr.delete(`/students/${this.student.id}/attachments/${bucketID}`)

      this.deleteAttachmentOK()
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action.bound
  deleteAttachmentOK() {
    this.fetchAttachments(this.student.id)
  }

  @action
  fetchAttachments = async(id) => {
    try {
      const res = await xhr.get(`/students/${id}/attachments`, {
        params: {
          only: [
            'id', 'filename', 'public_url', 'created_at', 'thumbnail', 'modifiable',
            'visibility', 'is_call_recording?', 'size', 'groups.group_name'
          ].join(',')
        }
      })

      this.fetchAttachmentsOK(res)
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action.bound
  fetchAttachmentsOK(res) {
    this.attachments = res.data
  }

  getAttachmentData = (filename, attachment) => {
    const data = new FormData()

    data.append('filename', filename)
    data.append('attachment', attachment)

    return data
  }

  @action
  changeAttachmentVisibility = async(bucketID, visibility) => {
    try {
      await xhr.put(`/students/${this.student.id}/attachments/${bucketID}`, {visibility})
    }
    catch(e) {
      this.setIsError(this.getError(e))
    }
  }
}

export default new StudentCardStore()
