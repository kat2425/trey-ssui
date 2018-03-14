import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EVJSChart = renderIf(VJSChart)

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

  listOptions = () => {
    return [
      { value: 'last_month',   label: 'Last Month'    },
      { value: 'last_quarter', label: 'Last 3 Months' },
      { value: 'last_six',     label: 'Last 6 Months' },
    ]
  }

  getYearReportPath = () => {
    if (this.state.selected.school_id) {
      return '/public/VJS/ss_ui/attendance/ada_over_year_school'
    } else {
      return '/public/VJS/ss_ui/attendance/ada_over_year'
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
            setDefault    = {!userStore.user.isDistrictLevel}
            clearable     = {userStore.user.isDistrictLevel}
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

        <div className='row mb-3' hidden={userStore.user.isTeacher}>
          <VJSChart
            id          = 'ada-over-year'
            reportPath  = {this.getYearReportPath()}
            scale       = 'container'
            className   = 'col-md-9'
            fullHeight  = {true}
            title       = 'Attendance for Year'
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
            className   = {userStore.user.isTeacher ? 'col-md-3' : 'col-md-4'}
            isTable     = {true}
            fullHeight  = {true}
            params      = {this.state.params}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'attendance'
                    })
                  }
                }
              }
            }}
          />

          <EVJSChart
            renderIf    = {userStore.user.isTeacher}
            id          = 'ada-daily-breakdown-teacher'
            reportPath  = '/public/VJS/ss_ui/attendance/daily_breakdown'
            title       = 'Daily Breakdown'
            className   = 'col-md-3'
            fullHeight  = {true}
            params      = {this.state.params}
          />

          <VJSChart
            id          = 'ada-code-breakdown'
            reportPath  = '/public/VJS/ss_ui/attendance/code_breakdown'
            title       = 'Code Breakdown'
            className   = {userStore.user.isTeacher ? 'col-md-6' : 'col-md-8'}
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
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'attendance'
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
