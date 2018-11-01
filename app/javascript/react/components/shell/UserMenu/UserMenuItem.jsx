import React, { Component }     from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'

import {
  NavItem, NavLink, Badge
} from 'reactstrap'

const navIcon    = { fontSize: '16px' }
const activeItem = {
  color:           '#3f9fcf',
  fontWeight:      'bold',
  boxShadow:       'inset 1px 0 #fff,inset 5px 0 #3f9fcf',
  backgroundColor: '#f7fcff',
}

const renderNormal = ({link, title, iconClass, badge, ...rest}) => (
  <NavLink
    className   = 'pr-4 pl-4 p-1'
    href        = {link}
  >
    <span className={`text-muted mr-3 icon ${iconClass}`} style={navIcon} />
    {title}
    { badge ? <span className={`ml-2 badge badge-success`}>{ badge }</span> : '' }
  </NavLink>
)

const renderRouterLink = ({link, title, iconClass, badge, ...rest}) => (
  <NavLink
    tag         = {RRNavLink}
    activeStyle = {activeItem}
    className   = 'pr-4 pl-4 p-1'
    to          = {(link || '/404')}
    {...rest}
  >
    <span className={`text-muted mr-3 icon ${iconClass}`} style={navIcon} />
    {title}
    { badge ? <span className={`ml-2 badge badge-success`}>{ badge }</span> : '' }
  </NavLink>
)

const UserMenuItem = (props) => (
  <NavItem className='pr-1'>
    { props.noRoute ? renderNormal(props) : renderRouterLink(props) }
  </NavItem>
)

export default UserMenuItem
