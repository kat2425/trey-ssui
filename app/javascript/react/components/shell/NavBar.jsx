import React, { Component }     from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Route, withRouter }    from 'react-router-dom'
import { inject, observer }     from 'mobx-react'

import {
  Collapse, 
  Nav, 
  NavItem, 
  NavLink, 
  Navbar,
  NavbarBrand
} from 'reactstrap'


import StudentSearch                    from './StudentSearch'
import fireEvent                        from 'helpers/FireEvent'
import userStore                        from 'stores/UserStore'
import renderIf                         from 'ui/hoc/renderIf'
import intercomEvent,{ updateIntercom } from 'helpers/Intercom'

const ENav               = renderIf(Nav)
const brandLogo          = { height: '35px' }

@withRouter
@inject('uiStore')
class RouteMonitor extends Component {
  componentDidMount() {
    const { uiStore, status, location } = this.props

    uiStore.isReportingInUse            = status

    this.trackEvent(location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const { uiStore, status, location } = nextProps

    uiStore.isReportingInUse            = status

    this.trackEvent(location.pathname)
  }

  trackEvent(path) {
    if (path !== '/r') {
      const data = this.untangleRoute(path)

      intercomEvent(data.event, data.params)
      updateIntercom()
    }
  }

  untangleRoute(path) {
    if (path.match(/\/students\//)) {
      return this.studentCardEvent(path)
    } else {
      return this.moduleEvent(path)
    }
  }

  moduleEvent(path) {
    const _match                  = path.match(/\/r\/(.*?)$/)
    const [ _module, _submodule ] = _match[1].split('/')

    return {
      event:  `web:${_module}`,
      params: {
        sub_module: (_submodule || null)
      }
    }
  }

  studentCardEvent(path) {
    const _match                  = path.match(/^(.*?)\/students\/(.*?)\/(.*?)$/)
    const [ _module, _submodule ] = _match[3].split('/')

    return {
      event:  `web:student_card:${_module}`,
      params: {
        student_id: _match[2],
        sub_module: (_submodule || null),
        referrer:   (_match[1] === '/r' ? null : _match[1])
      }
    }
  }

  render() {
    return null
  }
}

@withRouter
@inject('uiStore','studentSearchStore')
@observer
export default class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
  }

  onStudentChange = (e) => {
    e.length && fireEvent('showStudentCard', { student: e[0].id })
  }

  render() {
    const { uiStore, studentSearchStore }        = this.props

    return (
      <Navbar
        fixed     = 'top'
        className = 'navbar-toggleable-sm navbar-inverse bg-navbar app-navbar'
      >
        <NavbarBrand tag={RRNavLink} className='pt-0' to='/r'>
          <img
            src='https://secure.schoolstatus.com/images/navbar-logo-schoolstatus-circle.svg'
            style={brandLogo}
          />
        </NavbarBrand>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Route
            path   = '*'
            render = {() => (
              <RouteMonitor status={!!location.pathname.match(/\/r\/reporting/)}/>
            )}
          />

          <ENav className='navbar-nav' renderIf={uiStore.isReportingInUse}>
            <NavItem>
              <NavLink tag={RRNavLink} to='/r/reporting/adhoc'>
                <span className='icon icon-pencil mr-2'/>
                Create Report
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={RRNavLink} to='/r/reporting/viewer'>
                <span className='icon icon-folder mr-2'/>
                Saved Reports
              </NavLink>
            </NavItem>
          </ENav>

          <Nav className='navbar-nav ml-auto'>
            <NavItem className='mr-3'>
              <StudentSearch 
                style={{width: '300px'}} 
                isLoading={studentSearchStore.isLoading}
                options={studentSearchStore.students.slice()}
                hasSelectedStudent={false}
                lookupStudent={studentSearchStore.lookupStudent} 
                onChange={this.onStudentChange}
                
              />
            </NavItem>
            {userStore.hasLearningLab && (
              <NavItem>
                <NavLink target="_blank" href='/redirects/learning_lab'>Learning Lab</NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink target="_blank" href='http://help.schoolstatus.com/'>Help</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href='/settings'>Settings</NavLink>
            </NavItem>

            <NavItem>
              <NavLink style={{color: '#c3c3c3'}}>
                { userStore.username }
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href='/session/logout'>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
