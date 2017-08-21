import { observable, action, computed, runInAction, autorun } from 'mobx'

import _   from 'lodash'
import xhr from 'helpers/XHR'

class StudentCardStore {
  @observable isLoading = false
  @observable visible   = false
  @observable viewport  = 'overview'

  @observable student   = null
  @observable contacts  = [] // TODO: revisit how we pull this in

  @action
  fetchStudent(id) {
    this.isLoading = true
    this.visible   = false
    this.student   = null
    this.contacts  = []

    xhr.get(`/students/${id}`, {
      params: {
        only: [
          'id', 'sis_id', 'state_id', 'first_name', 'last_name', 'dob',
          'gender', 'race', 'address', 'city', 'state', 'zip',
          'enrollment_status', 'grade', 'school.school_name', 'data_relations'
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

  @action.bound
  fetchStudentOK(res) {
    this.fetchStudentContacts(res.data.id)

    this.student = res.data
  }

  @action.bound
  fetchStudentContactsOK(res) {
    this.contacts  = res.data
    this.isLoading = false
    this.visible   = true
  }

  @action
  hideCard() {
    this.visible = false
  }

  @computed
  get groupedContacts() {
    return this.contacts
  }
}

export default StudentCardStore = new StudentCardStore()
