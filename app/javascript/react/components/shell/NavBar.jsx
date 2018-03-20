import React, { Component }     from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Route, withRouter }    from 'react-router-dom'
import { inject, observer }     from 'mobx-react'

import {
  Collapse, Navbar,  NavbarToggler, NavbarBrand,
  Nav,      NavItem, NavLink, Badge,
  Form, Input
} from 'reactstrap'


import StudentSearch        from './StudentSearch'
import fireEvent            from '../../helpers/FireEvent'
import renderIf             from 'ui/hoc/renderIf'

const ENav      = renderIf(Nav)
const brandLogo = { height: '35px' }

@inject('uiStore')
class ReportRoute extends Component {
  componentDidMount() {
    const { uiStore, status } = this.props
    uiStore.isReportingInUse = status
  }

  componentWillReceiveProps(nextProps) {
    const { uiStore, status } = nextProps
    uiStore.isReportingInUse = status
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
    const { uiStore } = this.props

    return (
      <Navbar
        fixed     = 'top'
        className = 'navbar-toggleable-sm navbar-inverse bg-navbar app-navbar'
      >
        <NavbarBrand tag={RRNavLink} className='pt-0' to='/r'>
          <img src='https://secure.schoolstatus.com/images/navbar-logo-schoolstatus-circle.svg' style={brandLogo}/>
        </NavbarBrand>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Route
            path   = '*'
            render = {() => <ReportRoute status={!!location.pathname.match(/\/r\/reporting/)}/> }
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
              <StudentSearch style={{width: '300px'}} onChange={this.onStudentChange}/>
            </NavItem>

            <NavItem>
              <NavLink style={{color: '#c3c3c3'}}>
                { window.SSUser.username }
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href='/legacy/settings'>Settings</NavLink>
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
