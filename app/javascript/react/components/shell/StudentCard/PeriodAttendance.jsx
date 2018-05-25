import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import SubmoduleHeader      from 'ui/shell/SubmoduleHeader'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

@observer
export default class PeriodAttendance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      params:   {},
      selected: {}
    }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  render() {
    const { student } = this.props

    return (
      <div>
        <SubmoduleHeader title='Course Attendance'/>

        <div className='row'>
          <VJSChart
            id               = 'sc-periodattendance'
            reportPath       = '/public/VJS/ss_ui/course_attendance/student_card'
            scale            = 'container'
            title            = 'Details'
            className        = 'col-md-12'
            isTable          = {true}
            params           = {{
              ...this.state.params,
              student_id: [ student.id ]
            }}
          >
            <VJSICSelect
              id            = 'school_year'
              inputPath     = '/public/VJS/ss_ui/shared/input_controls/student_card_dataset_years/report'
              selectedValue = {this.state.selected.school_year}
              handleChange  = {::this.setYearFilter}
              clearable     = {false}
              setDefault    = {true}
              placeholder   = 'Year'
              width         = {100}
              params        = {{ dataset: ['course_attendance'], student_id: [student.id] }}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
