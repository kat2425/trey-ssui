import _          from 'lodash'
import getError   from 'helpers/ErrorParser'
import uiStore    from 'stores/UiStore'
import userStore  from 'stores/UserStore'
import Student    from 'stores/models/Student'
import xhr        from 'helpers/XHR'
import { setter } from 'mobx-decorators'
import {
  action,
  autorun,
  computed,
  observable
} from 'mobx'


class ParentHomePageStore {
  @setter @observable students            = []
  @setter @observable currentStudent      = null
  @setter @observable isError             = null
  @setter @observable userError           = null
  @setter @observable filter              = ''
  @setter @observable isFetchingUser      = false
  @setter @observable isFetchingStudents  = false
  @setter @observable toggleStudentList   = true
  @setter @observable validationStatus    = false


  constructor() {
    this.initAutoruns()
  }

  // Computed
  @computed get orderedStudents() {
    return _.orderBy(
      this.students,
      student => student.fullName,
      'asc'
    )
  }

  @computed get filteredStudents() {
    if (!_.isEmpty(this.orderedStudents)) {
      return this.orderedStudents.filter(
        s => s.fullName.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      )
    }
    return []
  }

  // Actions
  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          message: this.isError.message,
          title:   this.isError.title,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action fetchValidationStatus = async() => {
    if (!_.isEmpty(userStore.user.id)) {
      const { data } = await xhr.get('users/self', {params: {only: 'unattempted_validations'}})

      this.setValidationStatus(data.unattempted_validations)
    }
  }


  @action fetchStudents = async(id) => {
    const params = {
      params: {
        only: [
          'id',
          'full_name'
        ].join(',')
      }
    }

    this.setIsFetchingStudents(true)
    this.setIsError(false)
    try {
      const response = await xhr.get(`/users/${id}/students`, params)

      this.fetchStudentsOk(response.data)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsFetchingStudents(false)
    }
  }

  @action fetchStudentsOk = (students = []) => {
    this.setStudents(students.map(student => new Student(this, student)))

    if (!_.isEmpty(this.orderedStudents)) {
      this.setCurrentStudent(this.orderedStudents[0])
    }
  }


  @action checkApproval = async(id) => {
    try {
      this.setIsFetchingUser(true)
      this.setUserError(false)
      const { data } = await xhr.get(`/users/${id}`)

      return data
    } catch(err) {
      this.setUserError(true)
    } finally {
      this.setIsFetchingUser(false)
    }
  }
}

export default new ParentHomePageStore()
