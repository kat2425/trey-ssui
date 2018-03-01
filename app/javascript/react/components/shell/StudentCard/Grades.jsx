import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import VJSChart    from 'ui/vjs/VJSChart'
import VJSICSelect from 'ui/vjs/VJSICSelect'
import userStore   from 'stores/UserStore'

@observer
export default class Grades extends Component {
  constructor(props) {
    super(props)

    this._currentYear = userStore.user.currentSchoolYear

    this.state        = {
      params: {
        school_year: [ this._currentYear ]
      },
      selected: {
        school_year: { selected: true, label: this._currentYear , value: this._currentYear }
      }
    }
  }

  setYearFilter(val) {
    const jrsValue = val ? val.value : this._currentYear

    this.setState({
      params:   { ...this.state.params, school_year: [ jrsValue ] },
      selected: { ...this.state.selected, school_year: val }
    })
  }

  render() {
    const { student } = this.props

    return (
      <div>
        <h4 className='m-1 mb-3'>Grades</h4>

        <VJSChart
          id         = 'sc-student-grades'
          reportPath = '/public/VJS/ss_ui/grades/student_card'
          scale      = 'container'
          title      = 'Grades'
          isCrosstab = {true}
          params     = {{
            ...this.state.params,
            student_id: [ student.id ]
          }}
        >
          <VJSICSelect
            id            = 'school_year'
            inputPath     = '/public/VJS/ss_ui/grades/school_year'
            selectedValue = {this.state.selected.school_year}
            handleChange  = {::this.setYearFilter}
            clearable     = {false}
            placeholder   = 'Year'
            width         = {100}
          />
        </VJSChart>
      </div>
    )
  }
}
