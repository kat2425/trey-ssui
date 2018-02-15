import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import Select          from 'react-virtualized-select'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'
import userStore       from 'stores/UserStore'
import _               from 'lodash'

import MAAP            from './MAAP'
import STARReading     from './STARReading'
import STARMath        from './STARMath'
import STAREarlyLit    from './STAREarlyLit'
import AccelReader     from './AccelReader'

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
    this.options     = this.listOptions()
    this.state       = { selectedOption: '' }
  }

  listOptions = () => {
    const { modules }  = userStore.user
    const options      = [
      { module: 'vjs_renplace', value: 'accel_reader',   label: 'Accelerated Reader' },
      { module: 'vjs_ati',      value: 'ati',            label: 'ATI'                },
      { module: 'vjs_maap',     value: 'maap',           label: 'MAAP'               },
      { module: 'vjs_psat',     value: 'psat_89',        label: 'PSAT 8/9'           },
      { module: 'vjs_psat',     value: 'psat_nm',        label: 'PSAT NM'            },
      { module: 'vjs_renplace', value: 'star_early_lit', label: 'STAR Early Lit'     },
      { module: 'vjs_renplace', value: 'star_math',      label: 'STAR Math'          },
      { module: 'vjs_renplace', value: 'star_reading',   label: 'STAR Reading'       },
    ]

    return _.filter(options, (o) => userStore.hasModules(o.module))
  }

  handleChange(selectedOption) {
    const { history, location, uiStore, student } = this.props
    const value                 = selectedOption && selectedOption.value

    this.setState({ selectedOption })

    this.currentPath = _.take(location.pathname.split('/'), 3).join('/')
    history.push(`${this.currentPath}/students/${student.id}/assessment/${value}`)
  }

  renderDropdown() {
    const { selectedOption } = this.state
    const value              = selectedOption && selectedOption.value

    return (
      <div style={{width: 300}} className='ml-2 mr-3'>
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
            path   = {`${match.url}/maap`}
            render = {() => <MAAP student={student}/> }
          />

          <Route
            path   = {`${match.url}/star_reading`}
            render = {() => <STARReading student={student}/> }
          />

          <Route
            path   = {`${match.url}/star_math`}
            render = {() => <STARMath student={student}/> }
          />

          <Route
            path   = {`${match.url}/star_early_lit`}
            render = {() => <STAREarlyLit student={student}/> }
          />

          <Route
            path   = {`${match.url}/accel_reader`}
            render = {() => <AccelReader student={student}/> }
          />
        </Switch>
      </div>
    )
  }
}

export default Assessments
