import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class PSAT89 extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'psat89-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/psat/psat89_student_detail'
            params      = {this.state.params}
            title       = 'PSAT 8/9'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/psat_89'
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
