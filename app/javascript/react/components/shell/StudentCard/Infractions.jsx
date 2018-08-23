import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import SubmoduleHeader      from 'ui/shell/SubmoduleHeader'
import userStore            from 'stores/UserStore'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

@observer
export default class Infractions extends Component {
  constructor(props) {
    super(props)

    this._currentYear = userStore.user.currentSchoolYear
    this.state = {
      params: {
        school_year: [ this._currentYear ]
      },
      selected: {
        school_year: { selected: true, label: this._currentYear , value: this._currentYear }
      }
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
    const { student }  = this.props
    const emptyMessage = `
    This student has zero infractions!  Reach out to one of their contacts to say,
    "Way to go!"
    `

    return (
      <div>
        <SubmoduleHeader title='Infractions'/>

        <div className='row'>
          <VJSChart
            id               = 'sc-ada-days'
            reportPath       = '/public/VJS/ss_ui/infractions/daily_breakdown_student_card'
            scale            = 'container'
            title            = 'Daily Breakdown'
            className        = 'col-md-3'
            ignorePagination = {true}
            params           = {{
              ...this.state.params,
              student_id: [ student.id ]
            }}
          />

          <VJSChart
            id               = 'sc-maap'
            reportPath       = '/public/VJS/ss_ui/infractions/student_card'
            scale            = 'container'
            className        = 'col-md-9'
            title            = 'Details'
            isTable          = {true}
            ignorePagination = {true}
            emptyIcon        = {'emoji-happy'}
            emptyTitle       = 'Hooray!'
            emptyMessage     = {emptyMessage}
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
              placeholder   = 'Year'
              width         = {100}
              params        = {{ dataset: ['infractions'], student_id: [student.id] }}
            />
          </VJSChart>
        </div>
      </div>
    )
  }
}
