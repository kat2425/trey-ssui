import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

import fireEvent            from 'helpers/FireEvent'

@observer
export default class AP extends Component {
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

  render() {
    return (
      <div>
        <div className='row'>
          <VJSChart
            id          = 'ap-student-detail'
            reportPath  = '/public/VJS/ss_ui/assessment/ap/student_detail'
            params      = {this.state.params}
            title       = 'Advanced Placement (AP)'
            className   = 'col-md-12'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'assessment/ap'
                    })
                  }
                }
              }
            }}
          >
            <VJSICSelect
              id             = 'school_year'
              inputPath      = '/public/VJS/ss_ui/shared/input_controls/district_dataset_years/report'
              selectedValue  = {this.state.selected.school_year}
              handleChange   = {::this.setYearFilter}
              clearable      = {false}
              setDefault     = {true}
              requiredParams = {['school_year']}
              placeholder    = 'Year'
              width          = {100}
              params         = {{ dataset: ['aps'] }}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
