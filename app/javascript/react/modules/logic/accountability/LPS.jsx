import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class LPS extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setSchoolFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_filter: [ jrsValue ] },
      selected: { ...this.state.selected, school_filter: val }
    })
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Lowest Performing Students'>
          <VJSICSelect
            id            = 'school_filter'
            inputPath     = '/public/VJS/ss_ui/accountability/school_filter'
            selectedValue = {this.state.selected.school_filter}
            handleChange  = {::this.setSchoolFilter}
            placeholder   = 'School'
            width         = {275}
          />
        </ModuleHeader>

        <div className='alert alert-warning'>
          <h5>Calculation Details:</h5>
          <ul>
            <li>These students are projected based on current enrollment and are recalculated daily.</li>
            <li>Students may enter and exit this dataset as enrollment changes.</li>
            <li>Students in this module may not necessarily be considered LPS students for the 2019 MAAP test.</li>
            <li>Data is calculated based on students' 2018 MAAP scores, which will be used next year to calculate growth compared to 2018 MAAP scores.</li>
          </ul>
        </div>

        <div className='row'>
          <VJSChart
            id          = 'maap-student-detail'
            reportPath  = '/public/VJS/ss_ui/accountability/lps'
            title       = 'Student Detail'
            className   = 'col-md-12'
            isTable     = {true}
            params      = {this.state.params}
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
