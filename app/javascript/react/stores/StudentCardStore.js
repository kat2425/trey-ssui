import {
  observable,
  action,
  autorun,
} from 'mobx'

import _          from 'lodash'
import xhr        from 'helpers/XHR'
import { setter } from 'mobx-decorators'
import getError   from 'helpers/ErrorParser'
import uiStore    from 'stores/UiStore'

export class StudentCardStore {
  @setter @observable isLoading = false
  @observable viewport          = 'overview'

  @observable student           = null
  @observable attachments       = []
  @observable overview          = []

  @setter @observable isError   = null

  constructor() {
    this.initAutoruns()
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
    this.setIsError(false)

    this.student  = null
    this.overview = []

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
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action.bound
  fetchStudentOK(res) {
    this.fetchStudentOverview(res.data.id)

    this.student = res.data
  }

  @action
  fetchStudentOverview = async(id) => {
    try {
      const res = await xhr.get(`/students/${id}/overview_stats`, {
      })

      this.fetchStudentOverviewOK(res)
    } catch (e) {
      this.setIsError(getError(e))
    }
  }

  @action.bound
  fetchStudentOverviewOK(res) {
    this.overview = res.data
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
    this.student  = null
    this.overview = []
  }
}

export default new StudentCardStore()
