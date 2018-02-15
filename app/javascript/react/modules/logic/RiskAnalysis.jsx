import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import MassEmail            from 'ui/shell/MassEmail/MassEmail'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EMassEmail   = renderIf(MassEmail)
const EVJSICSelect = renderIf(VJSICSelect)

export default class RiskAnalysis extends Component {
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
      params:   { ...this.state.params, class_period: [ jrsValue ] },
      selected: { ...this.state.selected, class_period: val }
    })
  }

  setCourseFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, course_id: [ jrsValue ] },
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

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

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
    const studentDetailPath = (userStore.user.higherEd)
      ? '/public/VJS/ss_ui/risk_analysis/student_detail'
      : '/public/VJS/at_risk_student_detail'

    return (
      <div>
        <ModuleHeader title='Risk Analysis'>
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

          <EVJSICSelect
            id            = 'school_year'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/cascade_courses/report'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setYearFilter}
            params        = {this.state.params}
            placeholder   = 'Year'
            width         = {100}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'risk-student-detail'
            reportPath  = {studentDetailPath}
            params      = {this.state.params}
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
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
        </div>
      </div>
    )
  }
}
