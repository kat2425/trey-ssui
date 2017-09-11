import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import {
  Collapse, Navbar,  NavbarToggler, NavbarBrand,
  Nav,      NavItem, NavLink, Badge, Row, Col, Button,
  ButtonGroup
} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import moment from 'moment'
import fireEvent from 'helpers/FireEvent'

const actionBarStyle = {
  backgroundColor: '#e8e8e8',
  boxShadow:       '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
  padding: 0,
  zIndex: 9999,
  border: 'none',
  transition: '0.5s all'
}

const actionBarNotification = {
  fontSize:      '70%',
  verticalAlign: 'top',
  boxShadow:     '0 1px 2px 0 rgba(0,0,0,0.2)'
}

const style = {
  callBar: {
    zIndex: 9999,
    padding: 5,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  
  callBarCallText: {
    color: 'white',
    margin: '0 auto',
    fontSize: '1.5em'
  },
  callBarBtn: {
    color: 'dimgray',
    backgroundColor: 'white',
    marginRight: 5
  }
}

@observer
export default class ActionBar extends Component {
  showSidebar() {
    fireEvent('toggleSidebar')
  }

  componentDidMount() {
    // this.props.store.fetchInbox()
    
  }

  renderBar() {
    const { callBar, callBarDisable, callBarCallText, callBarBtn, callBarEndText, isMute } = style
    const { isCalling } = this.props.callingStore
      return (
        <Navbar style={callBar}>
          <Row>
            <Col sm="8">
              <p style={callBarCallText}>
                <span className="icon icon-phone"> </span>
                  { isCalling ? `Calling ${this.props.callingStore.contactName}` : 'Call Ended' }
              </p>
            </Col>
              { isCalling 
                ? <Col sm="4">
                    <ButtonGroup>        
                        <Button 
                          id="Popover1"
                          style={callBarBtn} 
                          onClick={() => this.props.callingStore.isDialPad(true)}>Dialpad</Button>
                        <Button 
                          style={callBarBtn} 
                          onClick={() => this.props.callingStore.isMute(true)}>Mute</Button>
                        <Button 
                          style={callBarBtn} 
                          onClick={() => this.props.callingStore.hangUp()}>End Call</Button> 
                    </ButtonGroup>
                  </Col>
                : null }       
          </Row>
        </Navbar>
      )
  }

  render() {
    const {isCalling, callBarVisible } = this.props.callingStore
    
    const actionBarStyle = {
      backgroundColor: isCalling ? '#5cb85c' : (!isCalling && callBarVisible ? '#d9534f' : '#e8e8e8'),
      boxShadow:       '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
      padding: 0,
      zIndex: 9999,
      border: 'none',
      transition: '0.5s all',
      color: isCalling ? 'white' : (!isCalling && callBarVisible ? 'white' : 'dimgray'),
    }

    return (
      <Navbar
        style = { actionBarStyle }
        fixed = 'bottom'
        className = 'nav'
      >
      <Row>
        <Col sm="8">
          <ReactCSSTransitionGroup
            transitionName="callBar"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {callBarVisible &&
            <div>{this.renderBar()}</div>}
          </ReactCSSTransitionGroup>
        </Col>
        <Col sm="4">
        <Nav className='ml-auto flex-row p-3' navbar>
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
        </Col>
        </Row>
      </Navbar>
    )
  }
}
