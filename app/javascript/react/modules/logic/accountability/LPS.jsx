import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import fireEvent            from 'helpers/FireEvent'

export default class LPS extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Lowest Performing Students'/>

        <div className='alert alert-warning'>
          <h5>Calculation Details:</h5>
          <ul>
            <li>These students are projected based on current enrollment and are recalculated daily.</li>
            <li>Students may enter and exit this dataset as enrollment changes.</li>
            <li>Students in this module may not necessarily be considered LPS students for the 2018 MAAP test.</li>
            <li>Data is calculated based on students' 2017 MAAP scores, which will be used next year to calculate growth compared to 2018 MAAP scores.</li>
          </ul>
        </div>

        <div className='row'>
          <VJSChart
            id          = 'maap-student-detail'
            reportPath  = '/public/VJS/ss_ui/accountability/lps'
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
      </div>
    )
  }
}
