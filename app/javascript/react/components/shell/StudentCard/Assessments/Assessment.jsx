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
import DMACLocal       from './DMACLocal'
import DMACSTAAR       from './DMACSTAAR'
import DRA             from './DRA'
import DRAWordAnalysis from './DRAWordAnalysis'
import Eduphoria       from './Eduphoria'
import LASLinks        from './LASLinks'
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
      { module: 'vjs_act',             value: 'act',             label: 'ACT'                },
      { module: 'vjs_act_aspire',      value: 'act_aspire',      label: 'ACT Aspire'         },
      { module: 'vjs_ati',             value: 'ati',             label: 'ATI'                },
      { module: 'vjs_case21',          value: 'case21',          label: 'Case21'             },
      { module: 'vjs_cogat',           value: 'cogat',           label: 'CogAT'              },
      { module: 'vjs_dra',             value: 'dra',             label: 'DRA'                },
      { module: 'vjs_dra_wa',          value: 'dra_wa',          label: 'DRA Word Analysis'  },
      { module: 'vjs_dmac_staar',      value: 'dmac_staar',      label: 'STAAR',             },
      { module: 'vjs_dmac_local',      value: 'dmac_local',      label: 'Local Assessments', },
      { module: 'vjs_eduphoria',       value: 'eduphoria',       label: 'Eduphoria'          },
      { module: 'vjs_las_links',       value: 'las_links',       label: 'LASLinks'           },
      { module: 'vjs_maap',            value: 'maap',            label: 'MAAP'               },
      { module: 'vjs_mastery_connect', value: 'mastery_connect', label: 'Mastery Connect'    },
      { module: 'vjs_mct',             value: 'mct',             label: 'MCT'                },
      { module: 'vjs_nwea',            value: 'nwea',            label: 'NWEA'               },
      { module: 'vjs_ostp',            value: 'ostp',            label: 'OSTP'               },
      { module: 'vjs_parcc',           value: 'parcc',           label: 'PARCC'              },
      { module: 'vjs_psat',            value: 'psat89',          label: 'PSAT 8/9'           },
      { module: 'vjs_psat',            value: 'psatnm',          label: 'PSAT NM'            },
      { module: 'vjs_scantron',        value: 'scantron',        label: 'Scantron'           },
      { module: 'vjs_renplace',        value: 'accel_reader',    label: 'Accelerated Reader' },
      { module: 'vjs_renplace',        value: 'star_early_lit',  label: 'STAR Early Lit'     },
      { module: 'vjs_renplace',        value: 'star_math',       label: 'STAR Math'          },
      { module: 'vjs_renplace',        value: 'star_reading',    label: 'STAR Reading'       },
      { module: 'vjs_satp',            value: 'satp',            label: 'SATP'               },
      { module: 'vjs_tcap',            value: 'tcap',            label: 'TCAP'               },
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
