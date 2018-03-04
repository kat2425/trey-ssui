import React, { Component } from 'react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import { inject, observer } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import Select               from 'react-virtualized-select'
import EmptyMessage         from 'ui/shell/EmptyMessage'

import ACT                  from 'modules/logic/assessment/ACT'
import ATI                  from 'modules/logic/assessment/ATI'
import AccelReader          from 'modules/logic/assessment/AccelReader'
import Case21               from 'modules/logic/assessment/Case21'
import CogAT                from 'modules/logic/assessment/CogAT'
import Eduphoria            from 'modules/logic/assessment/Eduphoria'
import MAAP                 from 'modules/logic/MAAP'
import OSTP                 from 'modules/logic/assessment/OSTP'
import PSAT89               from 'modules/logic/assessment/PSAT89'
import PSATNM               from 'modules/logic/assessment/PSATNM'
import STAREarlyLit         from 'modules/logic/assessment/STAREarlyLit'
import STARMath             from 'modules/logic/assessment/STARMath'
import STARReading          from 'modules/logic/assessment/STARReading'
import Scantron             from 'modules/logic/assessment/Scantron'

import userStore            from 'stores/UserStore'
import _                    from 'lodash'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

@withRouter
class Assessments extends Component {
  constructor(props) {
    super(props)

    this.options = this.listOptions()
    this.state   = { selectedOption: '' }
  }

  listOptions = () => {
    const { modules }  = userStore.user
    const options      = [
      { module: 'vjs_act',       value: 'act',            label: 'ACT'                },
      { module: 'vjs_ati',       value: 'ati',            label: 'ATI'                },
      { module: 'vjs_case21',    value: 'case21',         label: 'Case21'             },
      { module: 'vjs_cogat',     value: 'cogat',          label: 'CogAT'              },
      { module: 'vjs_eduphoria', value: 'eduphoria',      label: 'Eduphoria'          },
      { module: 'vjs_maap',      value: 'maap',           label: 'MAAP'               },
      { module: 'vjs_ostp',      value: 'ostp',           label: 'OSTP'               },
      { module: 'vjs_psat',      value: 'psat_89',        label: 'PSAT 8/9'           },
      { module: 'vjs_psat',      value: 'psat_nm',        label: 'PSAT NM'            },
      { module: 'vjs_scantron',  value: 'scantron',       label: 'Scantron'           },
      { module: 'vjs_renplace',  value: 'accel_reader',   label: 'Accelerated Reader' },
      { module: 'vjs_renplace',  value: 'star_early_lit', label: 'STAR Early Lit'     },
      { module: 'vjs_renplace',  value: 'star_math',      label: 'STAR Math'          },
      { module: 'vjs_renplace',  value: 'star_reading',   label: 'STAR Reading'       },
    ]

    return _.filter(options, (o) => userStore.hasModules(o.module))
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
          <Route path='/r/assessment/maap'           component={MAAP}         />
          <Route path='/r/assessment/act'            component={ACT}          />
          <Route path='/r/assessment/ati'            component={ATI}          />
          <Route path='/r/assessment/star_reading'   component={STARReading}  />
          <Route path='/r/assessment/star_math'      component={STARMath}     />
          <Route path='/r/assessment/star_early_lit' component={STAREarlyLit} />
          <Route path='/r/assessment/accel_reader'   component={AccelReader}  />
          <Route path='/r/assessment/psat_89'        component={PSAT89}       />
          <Route path='/r/assessment/psat_nm'        component={PSATNM}       />
          <Route path='/r/assessment/scantron'       component={Scantron}     />
          <Route path='/r/assessment/eduphoria'      component={Eduphoria}    />
          <Route path='/r/assessment/case21'         component={Case21}       />
          <Route path='/r/assessment/ostp'           component={OSTP}         />
          <Route path='/r/assessment/cogat'          component={CogAT}        />

          <Route render={() => {
            return (
              <EmptyMessage title="Looking for something?" icon='forward'>
                Click the menu in the top right corner. From the drop-down menu,
                select an assessment package you'd like to view.
              </EmptyMessage>
              )
          }}/>
        </Switch>
      </div>
    )
  }
}

export default Assessments
