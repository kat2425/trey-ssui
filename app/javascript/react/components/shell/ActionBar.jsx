import React, { Component }   from 'react'
import { observer }           from 'mobx-react'

import {
  Navbar, Nav, NavItem, Badge
} from 'reactstrap'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import fireEvent               from 'helpers/FireEvent'
import CallBar                 from 'ui/shell/ActionBar/Calling/CallBar'

const actionBarNotification = {
  fontSize:      '70%',
  verticalAlign: 'top',
  boxShadow:     '0 1px 2px 0 rgba(0,0,0,0.2)'
}

@observer
export default class ActionBar extends Component {
  constructor(props) {
    super(props)
  }

  showSidebar() {
    fireEvent('toggleSidebar')
  }

  render() {
    const { isCalling, isConferenceCalling, callBarVisible } = this.props.callingStore

    const actionBarStyle = {
      backgroundColor: ((isCalling || isConferenceCalling) ? '#5cb85c' : ((!isCalling && callBarVisible) ? '#d9534f' : '#e8e8e8')),
      boxShadow:       '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
      padding:         0,
      zIndex:          9999,
      border:          'none',
      maxHeight:       50,
      transition:      '0.5s all',
      color:           (isCalling ? '#ffffff' : ((!isCalling && callBarVisible) ? '#ffffff' : '#292b2c')),
    }

    return (
      <Navbar style={actionBarStyle} fixed='bottom' className='nav'>
        <Nav className='d-flex flex-row justify-content-end p-3' navbar>
          <NavItem className='mr-auto'>
            <ReactCSSTransitionGroup
              transitionName         = "callBar"
              transitionEnterTimeout = {500}
              transitionLeaveTimeout = {300}
            >
              {callBarVisible && <CallBar callingStore={this.props.callingStore}/>}
            </ReactCSSTransitionGroup>
          </NavItem>

          <NavItem className='ml-4'>
            <span className='icon icon-list mr-2' style={{opacity: '0.6'}}/>
            <span>Tasks</span>
          </NavItem>

          <NavItem className='ml-4'>
            <span className='icon icon-voicemail mr-2' style={{opacity: '0.6'}}/>
            <span>Voicemail</span>
          </NavItem>

          <NavItem className='ml-4' onClick={::this.showSidebar}>
            <span className='icon icon-chat mr-2' style={{opacity: '0.6'}}/>
            <span>Messages</span>

            <Badge color='danger' style={actionBarNotification} hidden={this.props.store.totalUnread < 1} pill>
              {this.props.store.totalUnread}
            </Badge>
          </NavItem>
        </Nav>
      </Navbar >
    )
  }
}
