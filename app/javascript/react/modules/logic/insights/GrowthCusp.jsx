import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class GrowthCusp extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Growth Cusp'>
        </ModuleHeader>

        <div className='row'>
          <VJSChart
            id          = 'growthcusp-student-detail'
            reportPath  = '/public/VJS/ss_ui/data_science/growth_cusp/student_detail'
            params      = {this.state.params}
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID
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
