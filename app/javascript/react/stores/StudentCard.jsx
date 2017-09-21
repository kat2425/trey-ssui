import { observable, action, computed, runInAction, autorun, toJS } from 'mobx'

import _   from 'lodash'
import xhr from 'helpers/XHR'

class StudentCardStore {
  @observable isLoading      = false
  @observable visible        = false
  @observable viewport       = 'overview'

  @observable student        = null
  @observable contacts       = []
  @observable communications = []

  @action
  fetchStudent(id) {
    this.isLoading      = true
    this.visible        = false
    this.student        = null
    this.contacts       = []
    this.communications = []

    xhr.get(`/students/${id}`, {
      params: {
        channel_stats:  true,
        list_relations: true,

        only: [
          'id', 'sis_id', 'state_id', 'first_name', 'last_name', 'dob',
          'gender', 'race', 'address', 'city', 'state', 'zip',
          'enrollment_status', 'grade', 'school.school_name', 'data_relations',
          'major', 'advisor', 'coach', 'channel_stats'
        ].join(',')
      }
    }).then(this.fetchStudentOK)
  }

  @action
  fetchStudentContacts(id) {
    xhr.get(`/students/${id}/contacts`, {
      params: {
        only: [
          'id', 'student_id', 'name', 'phone', 'email',
          'relationship', 'resides_with', 'checkout', 'emergency', 'no_contact'
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
      const cidx = this.contacts.findIndex(c => c.id == contact.id)

      return this.contacts = this.contacts.map(c => {
        if (c.id === contact.id) { c.number_type = res.data.type }
        return c
      })
    })
  }

  @action
  fetchCommunicationHistory(id) {
    xhr.get(`/channel/communications/${id}`, {
      params: {
        only: [
          'type', 'preview', 'link_ref', 'direction', 'media_url',
          'length', 'user.id', 'user.username', 'user.first_name', 'user.last_name',
          'contact.id', 'contact.name', 'contact.relationship', 'contact.email'
        ]
      }
    }).then(this.fetchCommunicationHistoryOK)
  }

  @action.bound
  fetchStudentOK(res) {
    this.fetchStudentContacts(res.data.id)
    this.fetchCommunicationHistory(res.data.id)

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
  fetchCommunicationHistoryOK(res) {
    this.communications = res.data
  }

  @action
  hideCard() {
    this.visible = false
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
}

export default StudentCardStore = new StudentCardStore()
