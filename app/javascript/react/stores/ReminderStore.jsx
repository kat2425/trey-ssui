import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'
import xhr                              from 'helpers/XHR'
import userStore                        from 'stores/UserStore'
import _                                from 'lodash'

const FILTER = {
  ALL:       'all',
  PENDING:   'pending',
  COMPLETED: 'completed'
}

class ReminderStore {
  @observable reminders               = []
  @observable reminderText            = null
  @observable selectedFilter          = FILTER.PENDING

  @observable @setter selectedStudent = null
  @observable @setter dateTime        = null
  @observable @setter isError         = null
  @observable @setter isLoading       = null


  @computed
  get filteredReminders() {
    if (this.selectedFilter != FILTER.ALL) {
      return _.filter(this.reminders, (e) => { return e.status == this.selectedFilter })
    } else {
      return this.reminders
    }
  }

  @computed get isEmpty(){
    return _.isEmpty(this.filteredReminders)
  }

  @action
  fetchReminders = () => {
    this.setIsLoading(true)

    xhr.get('/tasks')
      .then((data) => {
        this.reminders = data.data
        this.setIsLoading(false)
      })
      .catch((error) => {
        this.setIsError(error)
      })
  }

  @action
  addReminder = (reminder) => {
    this.isValidInput() && (
      xhr.post('/tasks', {
        student_id:  this.selectedStudent[0].id,
        user_id:     userStore.user.id,
        type:        'reminder',
        description: reminder,
        date:        this.dateTime
      })
        .then((data) => {
          this.reminders.unshift(data.data)
        })
        .catch((error) => {
          this.setIsError(error)
        })
    )
  }

  @action
  completeReminder = (id) => {
    xhr.put(`/tasks/${id}`, {
      id,
      status: 'complete'
    })
      .then(() => {
        const index = _.findIndex(this.reminders, (e) => { return e.id == id })

        this.reminders[index].status = 'complete'
      })
  }

  @action
  undoReminder = (id) => {
    xhr.put(`/tasks/${id}`, {
      id,
      status: 'pending'
    })
      .then(() => {
        const index = _.findIndex(this.reminders, (e) => { return e.id == id })

        this.reminders[index].status = 'pending'
      })
  }

  @action
  removeReminder = (id) => {
    xhr.delete(`/tasks/${id}`)
      .then(() => {
        const index = _.findIndex(this.reminders, (e) => { return e.id == id })

        this.reminders.splice(index, 1)
      })
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
  selectStudent = (student_id) => {
    this.setSelectedStudent(student_id)
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

export default ReminderStore = new ReminderStore()