import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSContainer         from 'ui/vjs/VJSContainer'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state = { params: { first_name: [ null ], last_name: [ null ] }, selected: {} }
  }

  setTestFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.stateState({
      params: {
        ...this.state.params,
        test_cascade: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        test_cascade: val
      }
    })
  }

  render() {
    return (
      <VJSContainer>
        <ModuleHeader title='Attendance'>
        </ModuleHeader>

        <div className='row mb-3'>
          <VJSChart
            id         = 'ada-over-year'
            reportPath = '/public/VJS/ss_ui/attendance/ada_over_year'
            scale      = 'container'
            className  = 'col-md-9'
            fullHeight  = {true}
            title      = 'Average Over Year'
          />

          <VJSChart
            id          = 'ada-daily-breakdown'
            reportPath  = '/public/VJS/ss_ui/attendance/daily_breakdown'
            title       = 'Daily Breakdown'
            className   = 'col-md-3'
            fullHeight  = {true}
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
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'ada-student-detail'
            reportPath  = '/public/VJS/ss_ui/attendance/student_detail'
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
      </VJSContainer>
    )
  }
}
