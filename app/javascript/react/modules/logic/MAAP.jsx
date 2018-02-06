import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSContainer         from 'ui/vjs/VJSContainer'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class MAAP extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <VJSContainer>
        <ModuleHeader title='MAAP'/>

        <div className='row'>
          <VJSChart
            id          = 'maap-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/maap/student_detail'
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

