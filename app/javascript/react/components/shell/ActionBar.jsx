import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import {
  Collapse, Navbar,  NavbarToggler, NavbarBrand,
  Nav,      NavItem, NavLink, Badge
} from 'reactstrap'

import fireEvent from 'helpers/FireEvent'

const actionBarStyle = {
  backgroundColor: '#e8e8e8',
  borderTop:       '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)'
}

const actionBarNotification = {
  fontSize:      '70%',
  verticalAlign: 'top',
  boxShadow:     '0 1px 2px 0 rgba(0,0,0,0.2)'
}

@observer
export default class ActionBar extends Component {
  showSidebar() {
    fireEvent('toggleSidebar')
  }

  componentDidMount() {
    // this.props.store.fetchInbox()
  }

  render() {
    return (
      <Navbar
        style = {actionBarStyle}
        fixed = 'bottom'
        className = 'nav'
      >
        <Nav className='ml-auto flex-row p-2' navbar>
          <NavItem className='ml-4'>
            <span className='icon icon-list mr-2'/>
            <span>Tasks</span>

            {/* <Badge color='success' style={actionBarNotification} pill> */}
            {/*   7 */}
            {/* </Badge> */}
          </NavItem>

          <NavItem className='ml-4'>
            <span className='icon icon-voicemail mr-2'/>
            <span>Voicemail</span>

            {/* <Badge color='danger' style={actionBarNotification} pill> */}
            {/*   4 */}
            {/* </Badge> */}
          </NavItem>

          <NavItem className='ml-4' onClick={::this.showSidebar}>
            <span className='icon icon-chat mr-2'/>
            <span>Messages</span>

            <Badge color='danger' style={actionBarNotification} hidden={this.props.store.totalUnread < 1} pill>
              { this.props.store.totalUnread }
            </Badge>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
