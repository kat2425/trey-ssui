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

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  setTestTypeFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, test_type: [ jrsValue ] },
      selected: { ...this.state.selected, test_type: val }
    })
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'eduphoria-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/eduphoria/student_detail'
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
          >
            <VJSICSelect
              id            = 'eduphoria_test_types'
              inputPath     = '/public/VJS/ss_ui/assessment/eduphoria/eduphoria_test_types'
              selectedValue = {this.state.selected.test_type}
              handleChange  = {::this.setTestTypeFilter}
              placeholder   = 'Test Type'
              width         = {170}
            />

            <VJSICSelect
              id            = 'school_year'
              inputPath     = '/public/VJS/ss_ui/shared/input_controls/district_dataset_years/report'
              selectedValue = {this.state.selected.school_year}
              handleChange  = {::this.setYearFilter}
              clearable     = {false}
              setDefault    = {true}
              placeholder   = 'Year'
              width         = {100}
              params        = {{ dataset: ['eduphorias'] }}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
