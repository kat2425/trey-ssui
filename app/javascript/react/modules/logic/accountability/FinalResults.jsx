import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class FinalResults extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Final Results'/>

        <div className='row p-0 m-0'>
          <div className='col-md-4 p-0 m-0'>
            <VJSChart
              id          = 'aa-totals'
              reportPath  = '/public/VJS/ss_ui/accountability/final/district_totals'
              title       = 'Totals'
              className   = 'col-md-12 p-0 m-0'
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

          <div className='col-md-8 pr-0'>
            <VJSChart
              id          = 'aa-prof-breakdown'
              reportPath  = '/public/VJS/ss_ui/accountability/final/prof_graph'
              title       = 'Proficiency Breakdown'
              className   = 'col-md-12 p-0 m-0'
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
              id          = 'aa-grown-breakdown'
              reportPath  = '/public/VJS/ss_ui/accountability/final/growth_graph'
              title       = 'Growth Breakdown'
              className   = 'col-md-12 p-0 m-0'
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

        <div className='row'>
          <VJSChart
            id          = 'aa-student-detail'
            reportPath  = '/public/VJS/ss_ui/accountability/final/prof_detail'
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

