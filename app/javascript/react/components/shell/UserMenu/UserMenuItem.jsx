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

export default class UserMenuItem extends Component {
  render() {
    return (
      <NavItem className='pr-1'>
        <NavLink tag={RRNavLink} activeStyle={activeItem} className='pr-4 pl-4 p-1' to={(this.props.link || '/404')}>
          <span className={`text-muted mr-3 icon ${this.props.iconClass}`} style={navIcon} />
          {this.props.title}
        </NavLink>
      </NavItem>
    )
  }
}
