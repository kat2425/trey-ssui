import React, { Component }     from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'

import {
  Collapse, Navbar,  NavbarToggler, NavbarBrand,
  Nav,      NavItem, NavLink, Badge,
  Form, Input
} from 'reactstrap'

import StudentSearch        from './StudentSearch'
import fireEvent            from '../../helpers/FireEvent'

const brandLogo = { height: '35px' }

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
        <NavbarBrand className='pt-0' href='/'>
          <img src='https://secure.schoolstatus.com/images/navbar-logo-schoolstatus-circle.svg' style={brandLogo}/>
        </NavbarBrand>

        <Collapse isOpen={this.state.isOpen} navbar>
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
