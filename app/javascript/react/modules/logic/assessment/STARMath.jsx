import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class STARMath extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='row'>
          <VJSChart
            id          = 'star-math-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/renplace/star_math/student_detail'
            title       = 'STAR Math'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      // path:    'assessment/maap'
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
