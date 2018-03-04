import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import VJSChart             from 'ui/vjs/VJSChart'
import VJSICSelect          from 'ui/vjs/VJSICSelect'

@observer
export default class Infractions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      params: {}, selected: {}
    }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:     { ...this.state.params, school_year: [ jrsValue ] },
      selected:   { ...this.state.selected, school_year: val }
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
        <h4 className='m-1 mb-3'>
          Infractions
        </h4>

        <div>
          <VJSChart
            id               = 'sc-maap'
            reportPath       = '/public/VJS/ss_ui/infractions/student_card'
            scale            = 'container'
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
              setDefault    = {true}
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
