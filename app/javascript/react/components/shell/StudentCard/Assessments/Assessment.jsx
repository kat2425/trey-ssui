import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import Select from 'react-virtualized-select'
import SubmoduleHeader         from 'ui/shell/SubmoduleHeader'
import MAAP from './MAAP'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

@withRouter
@inject('uiStore')
@observer
class Assessments extends Component {
  constructor(props) {
    super(props)

    this.currentPath = null

    this.options = [
      { value: 'maap',         label: 'MAAP'         },
      { value: 'star_reading', label: 'STAR Reading' },
    ]

    this.state = {
      selectedOption: '',
    }
  }

  handleChange(selectedOption) {
    const { history, location, uiStore, student } = this.props
    const value                 = selectedOption && selectedOption.value

    this.setState({ selectedOption })

    this.currentPath = location.pathname
    history.push(`${this.currentPath}/${value}`)
  }

  renderDropdown() {
    const { selectedOption } = this.state
    const value              = selectedOption && selectedOption.value

    return (
      <div style={{width: 300}} className='ml-2'>
        <Select
          name        = 'sc-assessment-menu'
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
    const { student, match, location } = this.props

    return (
      <div>
        <SubmoduleHeader title='Assessments'>
          { this.renderDropdown() }
        </SubmoduleHeader>

        <Switch location={location}>
          <Route
            path   = {`${match.url}/assessment/maap`}
            render = {() => <MAAP student={student}/> }
          />
        </Switch>
      </div>
    )
  }
}

export default Assessments
