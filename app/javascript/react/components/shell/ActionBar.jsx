import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, Badge, Row, Col, Button,
  ButtonGroup, ButtonDropdown, Dropdown, DropdownItem, DropdownMenu,
  DropdownToggle
} from 'reactstrap'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoadingSpinner          from 'ui/shell/LoadingSpinner'
import moment                  from 'moment'
import fireEvent               from 'helpers/FireEvent'

const actionBarNotification = {
  fontSize: '70%',
  verticalAlign: 'top',
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)'
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
    fontSize: '1.5em',
    paddingLeft: 15
  },
  callBarBtn: {
    backgroundColor: '#e8e8e8',
    border: 'none',
    marginRight: 5
  },
  unmuteBtn: {
    color: 'white',
    backgroundColor: 'darkgray',
    border: 'none',
    marginRight: 5
  }
}

const style = {
  callBar: {
    zIndex:         9999,
    padding:        5,
    position:       'absolute',
    height:         '100%',
    width:          '100%',
    justifyContent: 'center'
  },

  callBarCallText: {
    color:    'white',
    fontSize: '1.5em',
  },

  callBarBtn: {
    borderColor: 'rgba(255,255,255,0.4)',
    color:       'white',
  },

  unmuteBtn: {
    color:           'white',
    backgroundColor: 'darkgray',
    border:          'none',
    marginRight:     5
  }
}

@observer
export default class ActionBar extends Component {
  constructor(props) {
    super(props)

    this.state = { dropdownOpen: false }
  }

  showSidebar() {
    fireEvent('toggleSidebar')
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  renderCallBar() {
    const {
      callBar,
      callBarDisable,
      callBarCallText,
      callBarBtn,
      callBarEndText,
      unmuteBtn
    } = style

    const {
      isCalling,
      isConferenceCalling,
      isConnected,
      selectMute,
      isMute,
      callTime,
      currentOutputDevice,
      changeOutput,
      outputDevices
    } = this.props.callingStore

    return (
      <Row>
        <Col md='8' style={{minWidth: 300}}>
          <span className='icon icon-phone mr-2'/>
          <span>
            { (isCalling
              ? `Calling ${this.props.callingStore.contactName}`
              : (isConferenceCalling ? 'Expect a call shortly...' : 'Call Ended'))
            }
          </span>
          <span style={{ float: 'right' }}>{!isConferenceCalling && callTime ? callTime : null}</span>
        </Col>

        <Col md='4'>
          <ReactCSSTransitionGroup
            transitionName         = 'callBar'
            transitionEnterTimeout = {500}
            transitionLeaveTimeout = {200}
          >
            {isCalling && isConnected
              ? <ButtonGroup>
                <ButtonDropdown isOpen={this.state.dropdownOpen} dropup toggle={::this.toggle}>
                  <DropdownToggle style={callBarBtn} size='sm' color='success' outline caret>
                    {currentOutputDevice ? currentOutputDevice : 'Output Devices'}
                  </DropdownToggle>

                  <DropdownMenu>
                    {outputDevices
                      ? outputDevices.map((device) =>
                        <DropdownItem key={device.id} onClick={() => changeOutput(device.id, device.label)} >
                          {device.label}
                        </DropdownItem>)
                      : null}
                  </DropdownMenu>
                </ButtonDropdown>

                <Button
                  id      = 'Popover1'
                  size    = 'sm'
                  color   = 'success'
                  style   = {callBarBtn}
                  onClick = {() => this.props.callingStore.isDialPad(true)}
                  outline
                >
                  Dialpad
                </Button>

                <Button
                  size    = 'sm'
                  color   = 'success'
                  style   = {callBarBtn}
                  onClick = {() => isMute(!selectMute)}
                  active  = {selectMute}
                  outline = {!selectMute}
                >
                  {selectMute ? 'Unmute' : 'Mute'}
                </Button>

                <Button
                  size    = 'sm'
                  color   = 'success'
                  style   = {callBarBtn}
                  onClick = {() => this.props.callingStore.hangUp()}
                  outline
                >
                  End Call
                </Button>
              </ButtonGroup>
              : null}
          </ReactCSSTransitionGroup>
        </Col>
      </Row>
    )
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
              {callBarVisible && this.renderCallBar()}
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
        </Col>
        </Row>
      </Navbar >
    )
  }
}
