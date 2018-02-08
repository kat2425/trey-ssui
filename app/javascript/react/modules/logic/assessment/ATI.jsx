import React, { Component } from 'react'

import VJSChart  from 'ui/vjs/VJSChart'
import fireEvent from 'helpers/FireEvent'

export default class ATI extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='row'>
          <VJSChart
            id          = 'ati-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/ati/student_detail'
            title       = 'ATI'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/ati'
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
