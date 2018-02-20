import { 
  observable, 
  action, 
  autorun,
  runInAction
} from 'mobx'
import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'
import uiStore              from 'stores/UiStore'

export class SeatingChartStore {
  @observable selectedCourse             = null
  @observable courseStudents             = null
  @observable courseName                 = null
  @observable coursePeriod               = null
  @observable layout                     = []

  @observable @setter isFetchingCourses  = null
  @observable @setter isFetchingStudents = null
  @observable @setter isFetchingLayout   = null
  @observable @setter isSavingLayout     = null
  @observable @setter isMessage          = null
  @observable notification               = null

  constructor() {
    this.initAutoruns()
  }

  @action initAutoruns = () => {
    this.autoMessage()
  }

  @action autoMessage = () => {
    this.autoErrorDisposer = autorun('Watch messages', () => {
      if (this.isMessage) {
        uiStore.addMessage(this.isMessage.message, this.isMessage.type)
      }
    })
  }

  @action fetchCourseStudents = async(id) => {
    this.setIsFetchingStudents(true)
    this.setLayout(null)

    try {
      const response = await xhr.get(`/courses/${id}`, {
        params: {
          list_students: true
        }
      })

      runInAction(() => {
        this.fetchCourseStudentsOK(response)
        this.fetchSeatingChart(this.selectedCourse)
      })
    } catch (e) {
      this.setIsMessage({message: 'Error retrieving layout!', type: 'error'})
    } finally {
      this.setIsMessage(null)
      this.setIsFetchingStudents(false)
    }
  }

  @action fetchCourseStudentsOK = ({ data }) => {
    this.courseStudents = data.students
  }

  @action fetchSeatingChart = async(id) => {
    this.setIsFetchingLayout(true)

    try {
      const response = await xhr.get(`/courses/${id}/seating_chart`)

      this.fetchSeatingChartOK(response)
    } catch (error) {
      uiStore.addMessage('There was a problem fetching the seating chart!', 'error')
    } finally {
      this.setIsMessage(null)
      this.setIsFetchingLayout(false)
    }
  }

  @action fetchSeatingChartOK = ({ data }) => {
    this.setLayout(data)
  }


  @action fetchCourseName = async(id) => {
    try {
      const {data} = await xhr.get(`/courses/${id}`)

      this.courseName = data.course_name
      this.coursePeriod = data.class_period   
    } catch (error) {
      uiStore.addMessage('There was a problem fetching the course name!', 'error')
    } finally {
      this.setIsMessage(null)
      this.setIsFetchingLayout(false)
    }
  }

  @action updateSeatingChart = async(id, layout) => {
    this.setIsSavingLayout(true)

    try {
      await xhr.put(`/courses/${id}/seating_chart`, {
        seating_chart: JSON.stringify(layout)
      })
      runInAction(() => {
        this.setLayout(layout)
        this.setIsMessage({ message: 'Layout saved!', type: 'success'})
      })
    } catch(error) {
      this.setIsMessage({ message: 'Error saving layout!', type: 'error'})
    } finally {
      this.setIsMessage(null)
      this.setIsSavingLayout(false)
    }   
  }

  @action setLayout = (layout) => {
    this.layout = layout
  }

  @action setSelectedCourse = (id) => {
    this.selectedCourse = id
  }
}


export default new SeatingChartStore()
