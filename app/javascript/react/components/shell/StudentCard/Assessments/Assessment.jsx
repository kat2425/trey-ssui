import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import {
  Switch, Route, withRouter, Redirect
} from 'react-router-dom'

import Select          from 'react-virtualized-select'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'
import userStore       from 'stores/UserStore'
import _               from 'lodash'
import EmptyMessage    from 'ui/shell/EmptyMessage'

import ACT             from './ACT'
import ACTAspire       from './ACTAspire'
import ATI             from './ATI'
import AccelReader     from './AccelReader'
import Case21          from './Case21'
import CogAT           from './CogAT'
import CPAS            from './CPAS'
import DMACLocal       from './DMACLocal'
import DMACSTAAR       from './DMACSTAAR'
import DRA             from './DRA'
import DRAWordAnalysis from './DRAWordAnalysis'
import Eduphoria       from './Eduphoria'
import ELSEZTT         from './ELSEZTT'
import ELSEZAA         from './ELSEZAA'
import ESGI            from './ESGI'
import LASLinks        from './LASLinks'
import IReady          from './IReady'
import MAAP            from './MAAP'
import MCT             from './MCT'
import MasteryConnect  from './MasteryConnect'
import NWEA            from './NWEA'
import OSTP            from './OSTP'
import PARCC           from './PARCC'
import PSAT89          from './PSAT89'
import PSATNM          from './PSATNM'
import SATP            from './SATP'
import STAREarlyLit    from './STAREarlyLit'
import STARMath        from './STARMath'
import STARReading     from './STARReading'
import Scantron        from './Scantron'
import TCAP            from './TCAP'
import TVAAS           from './TVAAS'

import assessments     from 'helpers/Assessments'

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
    const { modules }        = userStore.user
    const { data_relations } = this.props.student

    return _.filter(assessments, (o) => {
      if (o.dataset) {
        return (userStore.hasModules(o.module) && _.includes(data_relations, o.dataset))
      } else {
        return userStore.hasModules(o.module)
      }
    })
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

          <Route
            path   = {`${match.url}/eduphoria`}
            render = {() => <Eduphoria student={student}/> }
          />

          <Route
            path   = {`${match.url}/case21`}
            render = {() => <Case21 student={student}/> }
          />

          <Route
            path   = {`${match.url}/psat89`}
            render = {() => <PSAT89 student={student}/> }
          />

          <Route
            path   = {`${match.url}/psatnm`}
            render = {() => <PSATNM student={student}/> }
          />

          <Route
            path   = {`${match.url}/ostp`}
            render = {() => <OSTP student={student}/> }
          />

          <Route
            path   = {`${match.url}/cogat`}
            render = {() => <CogAT student={student}/> }
          />

          <Route
            path   = {`${match.url}/ati`}
            render = {() => <ATI student={student}/> }
          />

          <Route
            path   = {`${match.url}/scantron`}
            render = {() => <Scantron student={student}/> }
          />

          <Route
            path   = {`${match.url}/act`}
            render = {() => <ACT student={student}/> }
          />

          <Route
            path   = {`${match.url}/nwea`}
            render = {() => <NWEA student={student}/> }
          />

          <Route
            path   = {`${match.url}/act_aspire`}
            render = {() => <ACTAspire student={student}/> }
          />

          <Route
            path   = {`${match.url}/mastery_connect`}
            render = {() => <MasteryConnect student={student}/> }
          />

          <Route
            path   = {`${match.url}/dra`}
            render = {() => <DRA student={student}/> }
          />

          <Route
            path   = {`${match.url}/dra_wa`}
            render = {() => <DRAWordAnalysis student={student}/> }
          />

          <Route
            path   = {`${match.url}/tcap`}
            render = {() => <TCAP student={student}/> }
          />

          <Route
            path   = {`${match.url}/dmac_staar`}
            render = {() => <DMACSTAAR student={student}/> }
          />

          <Route
            path   = {`${match.url}/dmac_local`}
            render = {() => <DMACLocal student={student}/> }
          />

          <Route
            path   = {`${match.url}/mct`}
            render = {() => <MCT student={student}/> }
          />

          <Route
            path   = {`${match.url}/satp`}
            render = {() => <SATP student={student}/> }
          />

          <Route
            path   = {`${match.url}/parcc`}
            render = {() => <PARCC student={student}/> }
          />

          <Route
            path   = {`${match.url}/las_links`}
            render = {() => <LASLinks student={student}/> }
          />

          <Route
            path   = {`${match.url}/iready`}
            render = {() => <IReady student={student}/> }
          />

          <Route
            path   = {`${match.url}/cpas`}
            render = {() => <CPAS student={student}/> }
          />

          <Route
            path   = {`${match.url}/els_eztt`}
            render = {() => <ELSEZTT student={student}/> }
          />

          <Route
            path   = {`${match.url}/els_ezaa`}
            render = {() => <ELSEZAA student={student}/> }
          />

          <Route
            path   = {`${match.url}/esgi`}
            render = {() => <ESGI student={student}/> }
          />

          <Route
            path   = {`${match.url}/tvaas`}
            render = {() => <TVAAS student={student}/> }
          />

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
