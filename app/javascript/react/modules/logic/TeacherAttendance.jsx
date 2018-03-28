import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EVJSChart = renderIf(VJSChart)

export default class TeacherAttendance extends Component {
  constructor(props) {
    super(props)

    this._currentYear = userStore.user.currentSchoolYear
    this.state        = { params: {}, selected: {} }
  }

  setTeacherFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, teacher_filter: [ jrsValue ] },
      selected: { ...this.state.selected, teacher_filter: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_filter: [ jrsValue ] },
      selected: { ...this.state.selected, school_filter: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Teacher Attendance'>
          <VJSICSelect
            id            = 'teacher_filter'
            inputPath     = '/public/VJS/teacher_attendance_detail'
            selectedValue = {this.state.selected.teacher_filter}
            handleChange  = {::this.setTeacherFilter}
            params        = {this.state.params}
            placeholder   = 'Teacher'
            width         = {300}
          />

          <VJSICSelect
            id            = 'school_filter'
            inputPath     = '/public/VJS/teacher_attendance_detail'
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
            width         = {300}
          />
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'teacher-attendance-reason-totals'
            reportPath  = '/public/VJS/teacher_attendance_reasons'
            title       = 'Totals by Reason'
            className   = 'col-md-6'
            params      = {this.state.params}
          />

          <VJSChart
            id          = 'teacher-attendance-day-totals'
            reportPath  = '/public/VJS/teacher_attendance_day_pie'
            title       = 'Totals by Day'
            className   = 'col-md-6'
            params      = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'teacher-attendance-school-totals'
            reportPath  = '/public/VJS/teacher_attendance_school_graph'
            title       = 'Totals by School'
            className   = 'col-md-12'
            params      = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'teacher-attendance-totals'
            reportPath  = '/public/VJS/teacher_attendance_aggregates'
            title       = 'Totals by Teacher'
            className   = 'col-md-12'
            isTable     = {true}
            params      = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'teacher-attendance-detail'
            reportPath  = '/public/VJS/teacher_attendance_detail'
            title       = 'Teacher Detail'
            className   = 'col-md-12'
            isTable     = {true}
            params      = {this.state.params}
          />
        </div>
      </div>
    )
  }
}
