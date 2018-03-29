import React, { Component } from 'react'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'
import fireEvent            from 'helpers/FireEvent'

export default class ATI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      params:   {}, selected: {}
    }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  setTestVersionFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, test_version: [ jrsValue ] },
      selected: { ...this.state.selected, test_version: val }
    })
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
            params      = {this.state.params}
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
          >
            <VJSICSelect
              id            = 'test_version'
              inputPath     = '/public/VJS/ss_ui/assessment/ati/test_version'
              selectedValue = {this.state.selected.test_version}
              handleChange  = {::this.setTestVersionFilter}
              placeholder   = 'Test Type'
              width         = {300}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
