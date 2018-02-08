import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

export default class Attendance extends Component {
  constructor(props) {
    super(props)

    this._currentYear = userStore.user.currentSchoolYear
    this.state        = {
      params: {
        school_year: [ this._currentYear ]
      },
      selected: {
        school_year: { selected: true, label: this._currentYear , value: this._currentYear }
      }
    }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : this._currentYear

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_id: [ jrsValue ] },
      selected: { ...this.state.selected, school_id: val }
    })
  }

  setDetailDate(val) {
    this.setState({
      params: { ...this.state.params, attendance_date: [ val ] }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Attendance'>
          <VJSICSelect
            id            = 'user_schools'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/user_schools'
            selectedValue = {this.state.selected.school_id}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            width         = {300}
          />

          <VJSICSelect
            id            = 'school_year'
            inputPath     = '/public/VJS/ss_ui/attendance/school_year'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setYearFilter}
            clearable     = {false}
            placeholder   = 'Year'
            width         = {100}
          />
        </ModuleHeader>

        <div className='row mb-3'>
          <VJSChart
            id          = 'ada-over-year'
            reportPath  = '/public/VJS/ss_ui/attendance/ada_over_year'
            scale       = 'container'
            className   = 'col-md-9'
            fullHeight  = {true}
            title       = 'Average Over Year'
            params      = {this.state.params}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const detailDate = link.parameters._date

                  if (detailDate) {
                    this.setDetailDate(detailDate)
                  }
                }
              }
            }}
          />

          <VJSChart
            id          = 'ada-daily-breakdown'
            reportPath  = '/public/VJS/ss_ui/attendance/daily_breakdown'
            title       = 'Daily Breakdown'
            className   = 'col-md-3'
            fullHeight  = {true}
            params      = {this.state.params}
          />
        </div>

        <div className='row mb-3'>
          <VJSChart
            id          = 'ada-top-students'
            reportPath  = '/public/VJS/ss_ui/attendance/top_students'
            title       = 'Most Absences'
            className   = 'col-md-4'
            isTable     = {true}
            fullHeight  = {true}
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
            id          = 'ada-code-breakdown'
            reportPath  = '/public/VJS/ss_ui/attendance/code_breakdown'
            title       = 'Code Breakdown'
            className   = 'col-md-8'
            isTable     = {true}
            fullHeight  = {true}
            params      = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'ada-student-detail'
            reportPath  = '/public/VJS/ss_ui/attendance/student_detail'
            title       = 'Student Detail'
            className   = 'col-md-12'
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
        </div>
      </div>
    )
  }
}
