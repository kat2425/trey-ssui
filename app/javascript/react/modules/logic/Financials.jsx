import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class Financials extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setStudentFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params: {
        ...this.state.params,
        student_filter: [ jrsValue ]
      },

      selected: {
        ...this.state.selected,
        student_filter: val
      }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Financials'>
          <VJSICSelect
            id            = 'student_filter'
            inputPath     = '/public/VJS/ss_ui/shared/input_controls/student_filter'
            selectedValue = {this.state.selected.student_filter}
            handleChange  = {::this.setStudentFilter}
            placeholder   = 'Student'
            width         = {275}
          />
        </ModuleHeader>


        <div className='row'>
          <VJSChart
            id         = 'financials-demographics-breakdown'
            reportPath = '/public/VJS/ss_ui/financials/breakdown_by_demographics'
            title      = 'Demographics Breakdown'
            className  = 'col-md-12'
          />
        </div>

        <div className='row'>
          <VJSChart
            id          = 'financials-student-detail'
            reportPath  = '/public/VJS/ss_ui/financials/student_financials_detail'
            params      = {this.state.params}
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
