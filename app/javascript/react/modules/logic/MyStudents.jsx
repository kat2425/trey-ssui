import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import ModuleHeader        from 'ui/shell/ModuleHeader'
import VJSChart            from 'ui/vjs/VJSChart'
import VJSICSelect         from 'ui/vjs/VJSICSelect'
import MassEmail           from 'ui/shell/MassEmail/MassEmail'
import userStore           from 'stores/UserStore'
import renderIf            from 'ui/hoc/renderIf'

import fireEvent           from 'helpers/FireEvent'

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
        school_year: [_currentYear ]
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
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params,   course_id: [ jrsValue ] },
      selected: { ...this.state.selected, course_id: val }
    })
  }

  setTeacherFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, teacher_id: [ jrsValue ] },
      selected: { ...this.state.selected, teacher_id: val }
    })
  }

  setTermFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, term: [ jrsValue ] },
      selected: { ...this.state.selected, term: val }
    })
  }

  // setYearFilter(val) {
  //   const jrsValue = val ? val.value : '~NOTHING~'
  //
  //   this.setState({
  //     params:   { ...this.state.params, school_year: [ jrsValue ] },
  //     selected: { ...this.state.selected, school_year: val }
  //   })
  // }

  renderMassEmail() {
    const { selected } = this.state

    if (!!selected.course_id && !!selected.term) {
      return (
        <EMassEmail
          type     = 'course'
          name     = {`${selected.course_id.label} | ${selected.teacher_id.label} | ${selected.term.label}`}
          id       = {selected.course_id.value}
          label    = 'Email Course'
          renderIf = {!!selected.course_id && !!selected.term}
        />
      )
    }
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
          { this.renderMassEmail() }

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
            params        = {this.state.params}
            placeholder   = 'Teacher'
            width         = {200}
          />

          {/* <EVJSICSelect */}
          {/*   id            = 'school_year' */}
          {/*   inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report' */}
          {/*   selectedValue = {this.state.selected.school_year} */}
          {/*   handleChange  = {::this.setYearFilter} */}
          {/*   params        = {this.state.params} */}
          {/*   placeholder   = 'Year' */}
          {/*   width         = {100} */}
          {/* /> */}
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
                  const studentID = link.parameters._student_id

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
                  const studentID = link.parameters._student_id

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
