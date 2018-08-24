import React, { Component}      from 'react'
import PropTypes                from 'prop-types'
import _                        from 'lodash'

import ModuleHeader             from 'ui/shell/ModuleHeader'
import VJSChart                 from 'ui/vjs/VJSChart'
import VJSICSelect              from 'ui/vjs/VJSICSelect'
import MassEmail                from 'ui/shell/MassEmail/MassEmail'
import userStore                from 'stores/UserStore'
import renderIf                 from 'ui/hoc/renderIf'
import fireEvent                from 'helpers/FireEvent'
import {
  Button
} from 'antd'

const EMassEmail   = renderIf(MassEmail)
const EVJSICSelect = renderIf(VJSICSelect)

export default class MyStudents extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    const _currentYear = userStore.user.currentSchoolYear.toString()

    this.state = {
      params: {
        school_year: [ _currentYear ]
      },
      selected: {
        school_year: { selected: true, label: _currentYear , value: _currentYear }
      }
    }
  }

  setPeriodFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params,   class_period: [ jrsValue ] },
      selected: { ...this.state.selected, class_period: val }
    })
  }

  setCourseFilter(val) {
    const { selected } = this.state
    const jrsValue = val ? val.value : '~NOTHING~'
    const isSelected = val && selected.course_id && val.value

    if(isSelected && val.value === selected.course_id.value) {
      return
    }

    this.setState({
      params:   { ...this.state.params,   course_id: [ jrsValue ] },
      selected: { ...this.state.selected, course_id: val }
    })
  }

  setTeacherFilter(val) {
    const { selected } = this.state
    const jrsValue = val ? val.value : '~NOTHING~'
    const isSelected = val && selected.teacher_id && val.value

    if (isSelected && val.value === selected.teacher_id.value) {
      return
    }

    this.setState({
      params:   { ...this.state.params, teacher_id: [ jrsValue ] },
      selected: {
        ...this.state.selected,
        course_id:  null,
        term:       null,
        teacher_id: val
      }
    })
  }

  setTermFilter(val) {
    const { selected } = this.state
    const jrsValue = val ? val.value : '~NOTHING~'
    const isSelected = val && selected.term && val.value

    if (isSelected && val.value === selected.term.value) {
      return
    }

    this.setState({
      params:   { ...this.state.params, term: [ jrsValue ] },
      selected: {
        ...this.state.selected,
        course_id: null,
        term:      val
      }
    })
  }

  setSchoolFilter(val) {
    const { selected } = this.state
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_id: [ jrsValue ] },
      selected: {
        ...selected,
        school_id: val
      }
    })
  }

  renderMassEmail() {
    const { selected } = this.state
    const _selected    = do {
      if (selected.course_id) {
        `${selected.course_id.label} | ${selected.teacher_id.label} | ${selected.term.label}`
      } else {
        'n/a'
      }
    }

    return (
      <EMassEmail
        type     = 'course'
        name     = { _selected }
        id       = { selected.course_id ? selected.course_id.value : 'n/a' }
        label    = 'Email Course'
        disabled = {!(!!selected.course_id && !!selected.term)}
      />
    )
  }

  renderSeatingChart() {
    const { selected } = this.state
    const { history }  = this.props
    const _selected_id = selected.course_id ? selected.course_id.value : 'n/a'

    return (
      <Button
        type      = 'primary'
        className = 'pl-2 ml-2'
        style     = {{marginTop: '1px'}}
        disabled  = {!(!!selected.course_id && !!selected.term)}
        onClick   = {() => {
          history.push({
            pathname: `/r/seating_chart/${_selected_id}`
          })
        }}
      >
        <span className='icon icon-grid mr-2' />
        Seating Chart
      </Button>
    )
  }

  renderCourseActions = () => {
    return (
      <div className='d-flex'>
        {this.renderMassEmail()}
        {userStore.user.isTeacher && this.renderSeatingChart()}
      </div>
    )
  }

  render() {
    const studentsPath = (userStore.user.higherEd)
      ? '/public/VJS/ss_ui/students/my_students_detail'
      : '/public/VJS/ss_ui/students/my_students_detail_k12'

    const activityPath = (userStore.user.higherEd)
      ? '/public/VJS/ss_ui/channel/recent_activity'
      : '/public/VJS/ss_ui/channel/recent_activity_k12'

    return (
      <div>
        <ModuleHeader title='My Students'>
          {this.renderCourseActions()}

          <EVJSICSelect
            id            = 'course_id'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.course_id}
            handleChange  = {::this.setCourseFilter}
            params        = {this.state.params}
            placeholder   = 'Course'
            width         = {220}
            renderIf      = {!!this.state.selected.term && !!this.state.selected.teacher_id}
          />

          <EVJSICSelect
            id            = 'term'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.term}
            handleChange  = {::this.setTermFilter}
            params        = {this.state.params}
            placeholder   = 'Term'
            width         = {100}
            renderIf      = {!!this.state.selected.teacher_id}
          />

          <EVJSICSelect
            id            = 'teacher_id'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.teacher_id}
            handleChange  = {::this.setTeacherFilter}
            setDefault    = {userStore.user.isTeacher}
            clearable     = {!userStore.user.isTeacher}
            params        = {this.state.params}
            placeholder   = 'Teacher'
            width         = {200}
          />

          <EVJSICSelect
            id            = 'school_id'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.school_id}
            handleChange  = {::this.setSchoolFilter}
            params        = {this.state.params}
            setDefault    = {!userStore.user.isTeacher}
            clearable     = {false}
            placeholder   = 'School'
            width         = {250}
            renderIf      = {!userStore.user.isTeacher}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'my-students-detail'
            reportPath  = {studentsPath}
            scale       = 'container'
            title       = 'Details'
            className   = 'col-md-7'
            isTable     = {true}
            params      = {this.state.params}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = _.get(link,'parameters._student_id','')

                  if (studentID) {
                    fireEvent('showStudentCard', { student: studentID })
                  }
                }
              }
            }}
          />

          <VJSChart
            id          = 'recent-activity'
            reportPath  = {activityPath}
            scale       = 'container'
            title       = 'Recent Engagements'
            className   = 'col-md-5'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = _.get(link,'parameters._student_id','')

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'engagement'
                    })
                  }
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}
