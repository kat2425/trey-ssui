import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'
import userStore            from 'stores/UserStore'
import renderIf             from 'ui/hoc/renderIf'

const EVJSChart = renderIf(VJSChart)

export default class Infractions extends Component {
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
      params: { ...this.state.params, date: [ val ] }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Infractions'>
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
            inputPath     = '/public/VJS/ss_ui/infractions/school_year'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setYearFilter}
            clearable     = {false}
            placeholder   = 'Year'
            width         = {100}
          />
        </ModuleHeader>

        <div className='row mb-3' hidden={userStore.user.isTeacher}>
          <VJSChart
            id         = 'infractions-over-year'
            reportPath = '/public/VJS/ss_ui/infractions/infractions_over_year'
            scale      = 'container'
            className  = 'col-md-9'
            fullHeight = {true}
            params     = {this.state.params}
            title      = 'Daily Totals'
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
            id         = 'infractions-daily-breakdown'
            reportPath = '/public/VJS/ss_ui/infractions/daily_breakdown'
            title      = 'Daily Breakdown'
            className  = 'col-md-3'
            fullHeight = {true}
            params     = {this.state.params}
          />
        </div>

        <div className='row mb-3'>
          <VJSChart
            id          = 'infraction-top-list'
            reportPath  = '/public/VJS/ss_ui/infractions/top_students'
            scale       = 'container'
            title       = 'Most Infractions'
            className   = {userStore.user.isTeacher ? 'col-md-3' : 'col-md-6'}
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
                      path:    'infractions'
                    })
                  }
                }
              }
            }}
          />

          <EVJSChart
            renderIf    = {userStore.user.isTeacher}
            id         = 'infractions-daily-breakdown-teacher'
            reportPath = '/public/VJS/ss_ui/infractions/daily_breakdown'
            title      = 'Daily Breakdown'
            className  = 'col-md-3'
            fullHeight = {true}
            params     = {this.state.params}
          />

          <VJSChart
            id         = 'infraction-top-codes'
            reportPath = '/public/VJS/ss_ui/infractions/top_codes'
            scale      = 'container'
            title      = 'Totals by Type'
            className  = 'col-md-6'
            fullHeight = {true}
            params     = {this.state.params}
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'infractions-student-detail'
            reportPath  = '/public/VJS/ss_ui/infractions/student_detail'
            scale       = 'container'
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
                      path:    'infractions'
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
