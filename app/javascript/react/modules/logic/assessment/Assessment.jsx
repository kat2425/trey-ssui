import React, { Component } from 'react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import { inject, observer } from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import Select               from 'react-virtualized-select'
import EmptyMessage         from 'ui/shell/EmptyMessage'

import ACT                  from './ACT'
import ACTAspire            from './ACTAspire'
import ACTAspireInterim     from './ACTAspireInterim'
import AIMSWeb              from './AIMSWeb'
import Amplify              from './Amplify'
import ATI                  from './ATI'
import AccelReader          from './AccelReader'
import Case21               from './Case21'
import CogAT                from './CogAT'
import CPAS                 from './CPAS'
import DIBELS               from './DIBELS'
import DRA                  from './DRA'
import DRAWordAnalysis      from './DRAWordAnalysis'
import DMACSTAAR            from './DMACSTAAR'
import DMACLocal            from './DMACLocal'
import Eduphoria            from './Eduphoria'
import ELSEZTT              from './ELSEZTT'
import ELSEZAA              from './ELSEZAA'
import ESGI                 from './ESGI'
import LASLinks             from './LASLinks'
import LEAP360              from './LEAP360'
import IReady               from './IReady'
import IStation             from './IStation'
import MCT                  from './MCT'
import MAAP                 from './MAAP'
import MasteryConnect       from './MasteryConnect'
import MKASThird            from './MKASThird'
import NWEA                 from './NWEA'
import OSTP                 from './OSTP'
import PARCC                from './PARCC'
import PSAT89               from './PSAT89'
import PSATNM               from './PSATNM'
import SATP                 from './SATP'
import STAREarlyLit         from './STAREarlyLit'
import STARMath             from './STARMath'
import STARReading          from './STARReading'
import Scantron             from './Scantron'
import TCAP                 from './TCAP'
import TVAAS                from './TVAAS'

import assessments          from 'helpers/Assessments'

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

    return _.filter(assessments, (o) => userStore.hasModules(o.module))
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
          <Route path='/r/assessment/accel_reader'       component={AccelReader}      />
          <Route path='/r/assessment/act'                component={ACT}              />
          <Route path='/r/assessment/act_aspire'         component={ACTAspire}        />
          <Route path='/r/assessment/act_aspire_interim' component={ACTAspireInterim} />
          <Route path='/r/assessment/aimsweb'            component={AIMSWeb}          />
          <Route path='/r/assessment/amplify'            component={Amplify}          />
          <Route path='/r/assessment/ati'                component={ATI}              />
          <Route path='/r/assessment/case21'             component={Case21}           />
          <Route path='/r/assessment/cogat'              component={CogAT}            />
          <Route path='/r/assessment/cpas'               component={CPAS}             />
          <Route path='/r/assessment/dibels'             component={DIBELS}           />
          <Route path='/r/assessment/dra'                component={DRA}              />
          <Route path='/r/assessment/dra_wa'             component={DRAWordAnalysis}  />
          <Route path='/r/assessment/dmac_staar'         component={DMACSTAAR}        />
          <Route path='/r/assessment/dmac_local'         component={DMACLocal}        />
          <Route path='/r/assessment/eduphoria'          component={Eduphoria}        />
          <Route path='/r/assessment/els_eztt'           component={ELSEZTT}          />
          <Route path='/r/assessment/els_ezaa'           component={ELSEZAA}          />
          <Route path='/r/assessment/esgi'               component={ESGI}             />
          <Route path='/r/assessment/las_links'          component={LASLinks}         />
          <Route path='/r/assessment/leap360'            component={LEAP360}          />
          <Route path='/r/assessment/iready'             component={IReady}           />
          <Route path='/r/assessment/istation'           component={IStation}         />
          <Route path='/r/assessment/maap'               component={MAAP}             />
          <Route path='/r/assessment/mct'                component={MCT}              />
          <Route path='/r/assessment/mastery_connect'    component={MasteryConnect}   />
          <Route path='/r/assessment/mkas_third'         component={MKASThird}        />
          <Route path='/r/assessment/nwea'               component={NWEA}             />
          <Route path='/r/assessment/ostp'               component={OSTP}             />
          <Route path='/r/assessment/parcc'              component={PARCC}            />
          <Route path='/r/assessment/psat_89'            component={PSAT89}           />
          <Route path='/r/assessment/psat_nm'            component={PSATNM}           />
          <Route path='/r/assessment/scantron'           component={Scantron}         />
          <Route path='/r/assessment/star_early_lit'     component={STAREarlyLit}     />
          <Route path='/r/assessment/star_math'          component={STARMath}         />
          <Route path='/r/assessment/star_reading'       component={STARReading}      />
          <Route path='/r/assessment/satp'               component={SATP}             />
          <Route path='/r/assessment/tcap'               component={TCAP}             />
          <Route path='/r/assessment/tvaas'              component={TVAAS}            />

          <Route render={() => {
            return (
              <EmptyMessage title="Looking for something?" icon='forward'>
                Click the menu in the top right corner. From the drop-down menu,
                select an assessment package you'd like to view.
              </EmptyMessage>
            )
          }}
          />
        </Switch>
      </div>
    )
  }
}

export default Assessments
