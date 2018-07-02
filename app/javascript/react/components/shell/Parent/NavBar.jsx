import React, { Component }     from 'react'
import { Route, withRouter }    from 'react-router-dom'
import { inject, observer }     from 'mobx-react'

import {
  Collapse, Navbar,  NavbarBrand,
  Nav,      NavItem, NavLink 
} from 'reactstrap'


import fireEvent     from 'helpers/FireEvent'
import intercomEvent from 'helpers/Intercom'

const brandLogo = { height: '35px' }

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
    const _match                    = path.match(/^(.*?)\/students\/(.*?)\/(.*?)$/)

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
@inject('uiStore')
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
    return (
      <Navbar
        fixed     = 'top'
        className = 'navbar-toggleable-sm navbar-inverse bg-navbar app-navbar'
      >
        <NavbarBrand href='/' className='pt-0' to='/r'>
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
          <Nav className='navbar-nav ml-auto'>
            <NavItem>
              <NavLink style={{color: '#c3c3c3'}}>
                { window.SSUser.username }
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href='/legacy/settings'>Settings</NavLink>
            </NavItem>

            <NavItem>
              <NavLink target="_blank" href='http://help.schoolstatus.com/'>Help</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href='/logout'>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
