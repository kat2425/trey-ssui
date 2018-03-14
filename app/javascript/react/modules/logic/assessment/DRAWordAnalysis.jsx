import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

export default class DRAWordAnalysis extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:     { ...this.state.params, school_year: [ jrsValue ] },
      selected:   { ...this.state.selected, school_year: val }
    })
  }

  render() {
    return (
      <div>

        <div className='row'>
          <VJSChart
            id          = 'dra-wa-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/dra_word_analysis/student_detail'
            params      = {this.state.params}
            title       = 'DRA Word Analysis'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/dra_wa'
                    })
                  }
                }
              }
            }}
          >
            <VJSICSelect
              id            = 'school_year'
              inputPath     = '/public/VJS/ss_ui/shared/input_controls/district_dataset_years/report'
              selectedValue = {this.state.selected.school_year}
              handleChange  = {::this.setYearFilter}
              clearable     = {false}
              setDefault    = {true}
              placeholder   = 'Year'
              width         = {100}
              params        = {{ dataset: ['dra_word_analysis'] }}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
