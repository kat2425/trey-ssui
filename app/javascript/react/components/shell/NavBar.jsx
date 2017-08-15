import React, { Component } from 'react'

import {
  Collapse, Navbar,  NavbarToggler, NavbarBrand,
  Nav,      NavItem, NavLink, Badge,
  Form, Input
} from 'reactstrap'

import StudentSearch from './StudentSearch'

const brandLogo = { height: '35px' }

export default class NavBar extends Component {
  render() {
    return (
      <Navbar
        fixed = 'top'
        className = 'navbar-toggleable-sm navbar-inverse bg-navbar app-navbar'
      >
        <NavbarBrand className='pt-0'>
          <img src='https://secure.schoolstatus.com/images/navbar-logo-schoolstatus-circle.svg' style={brandLogo}/>
        </NavbarBrand>

        <Nav className='navbar-nav mr-auto'>
          <NavItem>
            <NavLink active>Logic</NavLink>
          </NavItem>

          <NavItem>
            <NavLink>Channel</NavLink>
          </NavItem>

          <NavItem>
            <NavLink>Feedbak</NavLink>
          </NavItem>
        </Nav>

        <Nav className='navbar-nav ml-auto'>
          <NavItem className='mr-3'>
            <StudentSearch/>
          </NavItem>

          <NavItem>
            <NavLink>Settings</NavLink>
          </NavItem>

          <NavItem>
            <NavLink>Help</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href='/logout'>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
