import React, { Component } from 'react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import { inject, observer } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import Select               from 'react-virtualized-select'

import MAAP                 from 'modules/logic/MAAP'
import ATI                  from 'modules/logic/assessment/ATI'
import STARReading          from 'modules/logic/assessment/STARReading'
import STARMath             from 'modules/logic/assessment/STARMath'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

@withRouter
class Assessments extends Component {
  constructor(props) {
    super(props)

    this.options = [
      { value: 'maap',         label: 'MAAP'         },
      { value: 'star_reading', label: 'STAR Reading' },
      { value: 'star_math',    label: 'STAR Math'    },
      // { value: 'ati',          label: 'ATI' }
    ]

    this.state = {
      selectedOption: '',
    }
  }

  handleChange(selectedOption) {
    const { history, location } = this.props
    const value                 = selectedOption && selectedOption.value

    this.setState({ selectedOption })
    history.push(`/r/assessment/${value}`)
  }

  renderDropdown() {
    const { selectedOption } = this.state
    const value              = selectedOption && selectedOption.value

    return (
      <div style={{width: 325}} className='ml-2'>
        <Select
          name        = 'assessment-menu'
          value       = {value}
          onChange    = {::this.handleChange}
          maxHeight   = {375}
          options     = {this.options}
          clearable   = {false}
          placeholder = 'Select Assessment Type...'
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <ModuleHeader title='Assessments'>
          { this.renderDropdown() }
        </ModuleHeader>

        <Switch>
          <Route path='/r/assessment/maap'         component={MAAP}        />
          <Route path='/r/assessment/ati'          component={ATI}         />
          <Route path='/r/assessment/star_reading' component={STARReading} />
          <Route path='/r/assessment/star_math'    component={STARMath}    />
        </Switch>
      </div>
    )
  }
}

export default Assessments
