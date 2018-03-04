import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class Eduphoria extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'eduphoria-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/eduphoria/student_detail_beta'
            params      = {this.state.params}
            title       = 'Eduphoria'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/eduphoria'
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