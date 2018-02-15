import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class AccelReader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='row'>
          <VJSChart
            id          = 'accel-reader-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/renplace/accel_reader/student_detail'
            title       = 'Accelerated Reader'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/accel_reader'
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
