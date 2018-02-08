import React, { Component } from 'react'

import VJSChart  from 'ui/vjs/VJSChart'
import fireEvent from 'helpers/FireEvent'

export default class MAAP extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='row'>
          <VJSChart
            id          = 'maap-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/maap/student_detail'
            title       = 'MAAP'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/maap'
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
