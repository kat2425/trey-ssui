import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class Infractions extends Component {
  render() {
    return (
      <div>
        <ModuleHeader title='Infractions'/>

        <div className='row mb-3'>
          <VJSChart
            id         = 'infractions-over-year'
            reportPath = '/public/VJS/ss_ui/infractions/infractions_over_year'
            scale      = 'container'
            className  = 'col-md-9'
            fullHeight  = {true}
            title      = 'Totals Over Year'
          />

          <VJSChart
            id          = 'infractions-daily-breakdown'
            reportPath  = '/public/VJS/ss_ui/infractions/daily_breakdown'
            title       = 'Daily Breakdown'
            className   = 'col-md-3'
            fullHeight  = {true}
          />
        </div>

        <div className='row mb-3'>
          <VJSChart
            id         = 'infraction-top-list'
            reportPath = '/public/VJS/ss_ui/infractions/top_students'
            scale      = 'container'
            title      = 'Most Infractions'
            className  = 'col-md-6'
            isTable    = {true}
            fullHeight = {true}
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
            id         = 'infraction-top-codes'
            reportPath = '/public/VJS/ss_ui/infractions/top_codes'
            scale      = 'container'
            title      = 'Totals by Type'
            className  = 'col-md-6'
            fullHeight  = {true}
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'infractions-student-detail'
            reportPath = '/public/VJS/ss_ui/infractions/student_detail'
            scale      = 'container'
            title      = 'Student Detail'
            className  = 'col-md-12'
            isTable    = {true}
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
