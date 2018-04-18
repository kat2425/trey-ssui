import React, { Component } from 'react'
import { observer }         from 'mobx'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import MassEmail            from 'ui/shell/MassEmail/MassEmail'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'
import _                    from 'lodash'

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

  getAreaBreakdownPath = () => {
    const { jasper } = userStore.user

    if (userStore.hasCustomModule('risk_analysis')) {
      return `${jasper.orgPath}/at_risk_area_breakdown`
    } else {
      return '/public/VJS/at_risk_area_breakdown'
    }
  }

  getTotalsBreakdownPath = () => {
    const { jasper } = userStore.user

    if (userStore.hasCustomModule('risk_analysis')) {
      return `${jasper.orgPath}/at_risk_totals_breakdown`
    } else {
      return '/public/VJS/at_risk_totals_breakdown'
    }
  }

  getStudentDetailPath = () => {
    const { jasper } = userStore.user

    if (userStore.hasCustomModule('risk_analysis')) {
      return `${jasper.orgPath}/at_risk_student_detail`
    } else {
      return '/public/VJS/at_risk_student_detail'
    }
  }

  renderCharts() {
    if (!userStore.user.higherEd) {
      return (
        <div className='row'>
          <VJSChart
            id          = 'risk-area-breakdown'
            reportPath  = {this.getAreaBreakdownPath()}
            params      = {this.state.params}
            title       = 'Area Breakdown'
            className   = 'col-md-6'
          />

          <VJSChart
            id          = 'risk-totals-breakdown'
            reportPath  = {this.getTotalsBreakdownPath()}
            params      = {this.state.params}
            title       = 'Totals'
            className   = 'col-md-6'
          />
        </div>
      )
    }
  }

  render() {
    const studentDetailPath = (userStore.user.higherEd)
      ? '/public/VJS/ss_ui/risk_analysis/student_detail'
      : this.getStudentDetailPath()

    return (
      <div>
        <ModuleHeader title='At Risk'>
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
        </ModuleHeader>

        { this.renderCharts() }

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
