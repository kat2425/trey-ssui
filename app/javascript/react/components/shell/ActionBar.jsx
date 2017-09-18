import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, Badge, Row, Col, Button,
  ButtonGroup, ButtonDropdown, Dropdown, DropdownItem, DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoadingSpinner from 'ui/shell/LoadingSpinner'
import moment from 'moment'
import fireEvent from 'helpers/FireEvent'

const actionBarStyle = {
  backgroundColor: '#e8e8e8',
  boxShadow: '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
  padding: 0,
  zIndex: 9999,
  border: 'none',
  transition: '0.5s all'
}

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

@observer
export default class ActionBar extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  showSidebar() {
    fireEvent('toggleSidebar')
  }

  componentDidMount() {
    // this.props.store.fetchInbox()

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
      <Navbar style={callBar}>
        <Row>
          <Col sm="8">
            <p style={callBarCallText}>
              <span className="icon icon-phone"> </span>
              { (isCalling ? `Calling ${this.props.callingStore.contactName}` : (isConferenceCalling ? `Expect a call shortly...` : 'Call Ended') ) }
              <span style={{ float: 'right' }}>{!isConferenceCalling && callTime ? callTime : null}</span>
            </p>
          </Col>
          <Col sm="4">
            <ReactCSSTransitionGroup
              transitionName="callBar"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={200}>
              {isCalling && isConnected
                ? <ButtonGroup>
                  <ButtonDropdown style={{ margin: '0px 15px' }} isOpen={this.state.dropdownOpen} dropup toggle={this.toggle}>
                    <DropdownToggle style={{ backgroundColor: 'transparent', color: 'white' }} caret size="sm">
                      {currentOutputDevice ? currentOutputDevice : 'Output Devices'}
                    </DropdownToggle>
                    <DropdownMenu >
                      {outputDevices
                        ? outputDevices.map((device) =>
                          <DropdownItem
                            onClick={() => changeOutput(device.id, device.label)} >
                            {device.label}
                          </DropdownItem>)
                        : null}
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Button
                    id="Popover1"
                    style={callBarBtn}
                    onClick={() => this.props.callingStore.isDialPad(true)}>Dialpad</Button>
                  <Button
                    style={selectMute ? unmuteBtn : callBarBtn}
                    onClick={() => isMute(!selectMute)}>{selectMute ? 'Unmute' : 'Mute'}</Button>
                  <Button
                    style={callBarBtn}
                    onClick={() => this.props.callingStore.hangUp()}>End Call</Button>
                </ButtonGroup>
                : null}
            </ReactCSSTransitionGroup>
          </Col>
        </Row>
      </Navbar>
    )
  }

  render() {
    const { isCalling, isConferenceCalling, callBarVisible } = this.props.callingStore

    const actionBarStyle = {
      backgroundColor: isCalling || isConferenceCalling 
      ? '#5cb85c' 
      : (!isCalling && callBarVisible 
        ? '#d9534f' 
        : '#e8e8e8'),
      boxShadow: '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
      padding: 0,
      zIndex: 9999,
      border: 'none',
      transition: '0.5s all',
      color: isCalling 
      ? '#ffffff' 
      : (!isCalling && callBarVisible 
        ? '#ffffff' 
        : '#696969'),
    }

    return (
      <Navbar
        style={actionBarStyle}
        fixed='bottom'
        className='nav'
      >
        <Row>
          <Col sm="8">
            <ReactCSSTransitionGroup
              transitionName="callBar"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {callBarVisible &&
                <div>{this.renderCallBar()}</div>}
            </ReactCSSTransitionGroup>
          </Col>
          <Col sm="4">
            <Nav className='ml-auto flex-row p-3' navbar>
              <NavItem className='ml-4'>
                <span className='icon icon-list mr-2' />
                <span>Tasks</span>

                {/* <Badge color='success' style={actionBarNotification} pill> */}
                {/*   7 */}
                {/* </Badge> */}
              </NavItem>

              <NavItem className='ml-4'>
                <span className='icon icon-voicemail mr-2' />
                <span>Voicemail</span>

                {/* <Badge color='danger' style={actionBarNotification} pill> */}
                {/*   4 */}
                {/* </Badge> */}
              </NavItem>

              <NavItem className='ml-4' onClick={::this.showSidebar}>
            <span className='icon icon-chat mr-2' />
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
