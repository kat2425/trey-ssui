import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'
import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import userStore  from 'stores/UserStore'
import getError   from 'helpers/ErrorParser'
import uiStore    from 'stores/UiStore'
import _          from 'lodash'

const FILTER = {
  ALL:       'all',
  PENDING:   'pending',
  COMPLETED: 'completed'
}

export class ReminderStore {
  @observable reminders                        = []
  @observable reminderText                     = ''
  @observable selectedFilter                   = FILTER.PENDING

  @observable @setter selectedStudent          = null
  @observable @setter dateTime                 = null
  @observable @setter isError                  = null
  @observable @setter isLoading                = null
  @observable @setter isTypeAheadLoading       = false

  constructor() {
    this.initAutoruns()
  }

  @computed
  get filteredReminders() {
    if (this.selectedFilter !== FILTER.ALL) {
      return _.filter(this.reminders, (e) => { return e.status === this.selectedFilter })
    } else {
      return this.reminders
    }
  }

  @computed get isEmpty(){
    return _.isEmpty(this.filteredReminders)
  }

  @computed get totalPending(){
    return _.filter(this.reminders, (e) => { return e.status === 'pending' }).length
  }

  @computed get hasSelectedStudent() {
    return !_.isEmpty(this.selectedStudent)
  }

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
  fetchReminders = async() => {
    try {
      this.setIsLoading(true)
      const res = await xhr.get('/tasks', {
        params: {
          only: [
            'id', 'created_at', 'updated_at',
            'status', 'date', 'description', 'school_year',
            'user.id', 'user.full_name',
            'student.id', 'student.full_name',
            'contact.id', 'contact.name'
          ].join(',')
        }
      })

      this.reminders = res.data
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  addReminder = async(reminder) => {
    if (this.isValidInput()) {
      try {
        const res = await xhr.post('/tasks', {
          student_id:  this.selectedStudent.id,
          user_id:     userStore.user.id,
          type:        'reminder',
          description: reminder,
          date:        this.dateTime
        })

        this.reminders.unshift(res.data)
        uiStore.addMessage(
          'Successfully added reminder!',
          'success'
        )
      } catch (e) {
        this.setIsError(getError(e))
      }
    } else {
      this.setIsError({title: 'Invalid Input', message: 'Check your reminder input'})
    }
  }

  @action
  completeReminder = async(id) => {
    try {
      await xhr.put(`/tasks/${id}`, {
        id,
        status: 'complete'
      })
      const index = _.findIndex(this.reminders, (res) => {
        return res.id === id
      })

      this.reminders[index].status = 'complete'
      uiStore.addMessage(
        'Reminder successfully marked as completed!',
        'success'
      )
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  undoReminder = async(id) => {
    try {
      await xhr.put(`/tasks/${id}`, {
        id,
        status: 'pending'
      })
      const index = _.findIndex(this.reminders, (res) => {
        return res.id === id
      })

      this.reminders[index].status = 'pending'
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  removeReminder = async(id) => {
    try {
      await xhr.delete(`/tasks/${id}`)
        .then(() => {
          const index = _.findIndex(this.reminders, (res) => {
            return res.id === id
          })

          this.reminders.splice(index, 1)
          uiStore.addMessage(
            'Reminder successfully deleted!',
            'warning'
          )
        })
    } catch(e) {
      this.setIsError(getError(e))
    }
  }

  @action
  setSelectedFilter = (filter) => {
    this.selectedFilter = filter
  }

  @action
  setReminderDesc = (desc) => {
    this.reminderText = desc
  }

  @action
  onChange = (students) => {
    _.isEmpty(students) ? this.selectStudent(null) : this.selectStudent(students[0])
  }

  @action
  selectStudent = (student) => {
    this.setSelectedStudent(student)
  }

  @action
  selectDateTime = (datetime) => {
    this.setDateTime(datetime)
  }

  @action
  isValidInput = () => {
    if (this.reminderText && this.selectedStudent && this.dateTime) {
      return true
    } else {
      return false
    }
  }
}

export default new ReminderStore()
