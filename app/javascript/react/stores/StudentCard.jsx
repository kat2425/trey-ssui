import { observable, action, computed } from 'mobx'

import _                                from 'lodash'
import xhr                              from 'helpers/XHR'
import intercomEvent                    from 'helpers/Intercom'

class StudentCardStore {
  @observable isLoading      = false
  @observable visible        = false
  @observable viewport       = 'overview'

  @observable student        = null
  @observable contacts       = []
  @observable attachments    = []

  @action hasDataRelation = (relation) => {
    return _.includes(this.student.data_relations, relation)
  }

  @action
  fetchStudent(id) {
    this.isLoading      = true
    this.visible        = false
    this.student        = null
    this.contacts.clear()

    xhr.get(`/students/${id}`, {
      params: {
        channel_stats:  true,
        list_relations: true,

        only: [
          'id', 'sis_id', 'state_id', 'first_name', 'last_name', 'dob',
          'gender', 'race', 'address', 'city', 'state', 'zip',
          'enrollment_status', 'grade', 'school.school_name', 'data_relations',
          'major', 'advisor', 'coach', 'channel_stats', 'flags'
        ].join(',')
      }
    }).then(this.fetchStudentOK)
  }

  @action
  fetchStudentContacts(id) {
    xhr.get(`/students/${id}/contacts`, {
      params: {
        only: [
          'id', 'student_id', 'name', 'phone', 'email', 'primary',
          'relationship', 'resides_with', 'checkout', 'emergency', 'no_contact',
          'stopped', 'student.full_name'
        ].join(',')
      }
    }).then(this.fetchStudentContactsOK)
  }

  // XXX: i feel like this is smelly -jd
  @action.bound
  fetchNumberCapability(contact) {
    xhr.post('/commo/validate_number', {
      number: contact.phone
    }).then(res => {
      // const cidx = this.contacts.findIndex(c => c.id == contact.id)

      return this.contacts = this.contacts.map(c => {
        if (c.id === contact.id) { c.number_type = res.data.type }
        return c
      })
    })
  }

  @action.bound
  fetchAttachments(id) {
    xhr.get(`/students/${id}/attachments`, {
      params: {
        only: [
          'id', 'filename', 'public_url', 'created_at', 'thumbnail', 'modifiable',
          'visibility', 'is_call_recording?', 'size', 'groups.group_name'
        ].join(',')
      }
    }).then(this.fetchAttachmentsOK)
  }

  @action
  toggleContactPrimary(id, bool) {
    xhr.put(`/contacts/${id}/primary`, {
      primary: bool
    }).then(res => {
      const index = _.findIndex(this.contacts, function(c) {
        return c.id === res.data.id
      })

      this.contacts[index].primary = bool
    })
  }

  @action
  triggerNativeMailTo(id) {
    xhr.get('/commo/email/get_conversation', {
      params: {
        id:   id,
        type: 'individual'
      }
    }).then(res => {
      const _contact = _.find(this.contacts, c => c.id === res.data.reference_id)
      const _mailto  = encodeURIComponent(`${_contact.name.replace(/,/g, '')} <${res.data.email_link}>`)
      const _gmail   = `https://mail.google.com/mail/?view=cm&fs=1&to=${_mailto}`

      window.studentCardMailer.location.href = _gmail
      window.studentCardMailer.focus()
    })
  }

  @action
  printStudentCard() {
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

  @action.bound
  uploadFile(filename, attachment) {
    intercomEvent('web:student_card:attachments:add_attachment', {
      student_id: this.student.id,
      filename:   filename
    })

    const data = this.getAttachmentData(filename, attachment)

    xhr.post(`/students/${this.student.id}/attachments`, data, {
      'Content-Type': 'multipart/form-data'
    }).then(this.uploadFileOK)
  }

  @action.bound
  uploadFileOK(res) {
    this.fetchAttachments(this.student.id)
  }

  @action.bound
  deleteAttachment(bucketID) {
    xhr.delete(`/students/${this.student.id}/attachments/${bucketID}`).then(this.deleteAttachmentOK)
  }

  @action.bound
  deleteAttachmentOK(res) {
    this.fetchAttachments(this.student.id)
  }

  @action.bound
  fetchStudentOK(res) {
    this.fetchStudentContacts(res.data.id)
    this.fetchAttachments(res.data.id)

    this.student = res.data
  }

  @action.bound
  fetchStudentContactsOK(res) {
    this.contacts  = res.data
    this.contacts.map(d => this.fetchNumberCapability(d))

    this.isLoading = false
    this.visible   = true
  }

  @action.bound
  fetchAttachmentsOK(res) {
    this.attachments = res.data
  }

  @action
  hideCard() {
    this.visible = false
    this.student = null
    this.contacts.clear()
  }

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

  getAttachmentData = (filename, attachment) => {
    const data = new FormData()

    data.append('filename', filename)
    data.append('attachment', attachment)

    return data
  }
}

export default new StudentCardStore()
