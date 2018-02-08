import React, { Component } from 'react'

import VJSChart     from 'ui/vjs/VJSChart'
import ModuleHeader from 'ui/shell/ModuleHeader'
import fireEvent    from 'helpers/FireEvent'

export default class CallHistory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Call History'/>

        <div className='row'>
          <VJSChart
            id          = 'call-history'
            reportPath  = '/public/VJS/ss_ui/channel/call_history'
            title       = 'Student Detail'
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
