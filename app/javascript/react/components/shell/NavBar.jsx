import React, { Component }     from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'

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

        {/* <Nav className='navbar-nav mr-auto'> */}
        {/*   <NavItem> */}
        {/*     <NavLink active>Logic</NavLink> */}
        {/*   </NavItem> */}
        {/*  */}
        {/*   <NavItem> */}
        {/*     <NavLink>Channel</NavLink> */}
        {/*   </NavItem> */}
        {/*  */}
        {/*   <NavItem> */}
        {/*     <NavLink>Feedbak</NavLink> */}
        {/*   </NavItem> */}
        {/* </Nav> */}

        <Nav className='navbar-nav ml-auto'>
          <NavItem className='mr-3'>
            <StudentSearch/>
          </NavItem>

          <NavItem>
            <NavLink style={{color: '#c3c3c3'}}>
              { window.SSUser.username }
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={RRNavLink} to='/r/user_settings'>Settings</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href='/logout'>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
