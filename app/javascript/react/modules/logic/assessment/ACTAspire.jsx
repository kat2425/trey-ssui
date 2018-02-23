import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class ACTAspire extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'act-aspire-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/act_aspire/student_detail'
            params      = {this.state.params}
            title       = 'ACT Aspire'
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
