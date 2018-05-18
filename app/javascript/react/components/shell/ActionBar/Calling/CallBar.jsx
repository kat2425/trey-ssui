import React, { Component }    from 'react'
import { observer }            from 'mobx-react'
import {
  Row, Col, Button, ButtonGroup, ButtonDropdown,
  DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const callBarBtn = {
  borderColor: 'rgba(255,255,255,0.4)',
  color:       'white'
}

@observer
export default class CallBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  renderButtons = () => {
    const {
      isCalling,
      isConnected,
      isMuteSelected,
      currentOutputDevice,
      changeOutput,
      outputDevices,
      toggleMute
    } = this.props.callingStore

    if(!isCalling || !isConnected) return null

    return (
      <ButtonGroup>
        <ButtonDropdown isOpen={this.state.dropdownOpen} direction='up' toggle={this.toggle}>
          <DropdownToggle style={callBarBtn} size='sm' color='success' outline caret>
            {currentOutputDevice ? currentOutputDevice : 'Output Devices'}
          </DropdownToggle>

          <DropdownMenu id='call-output-device'>
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
          onClick = {() => this.props.callingStore.setIsDialPadSelected(true)}
          outline
        >
        Dialpad
        </Button>

        <Button
          size    = 'sm'
          color   = 'success'
          style   = {callBarBtn}
          onClick = {toggleMute}
          active  = {isMuteSelected}
          outline = {!isMuteSelected}
        >
          {isMuteSelected ? 'Unmute' : 'Mute'}
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
        
    )
  }

  showCallingMessage = () => {
    const {isCalling, isCellCalling, contactName} = this.props.callingStore

    if(isCalling && contactName) {
      return `Calling ${contactName}`
    } else if(isCellCalling) {
      return 'Expect a call shortly...'
    } else {
      return 'Call Ended'
    }
  }

  render() {
    const {
      isCalling,
      isCellCalling,
      callTime,
      isConnected
    } = this.props.callingStore

    return (
      <Row>
        <Col md='8' style={{ minWidth: 300 }}>
          <span className='icon icon-phone mr-2' />
          <span>
            {this.showCallingMessage()}
          </span>
          <span style={{ float: 'right' }}>{!isCellCalling && callTime ? callTime : null}</span>
          <ReactCSSTransitionGroup
            transitionName         = 'callBar'
            transitionEnterTimeout = {500}
            transitionLeaveTimeout = {200}
          >
            {isCalling && isConnected &&
              <Button
                id      = 'CallNotesPopover'
                size    = 'sm'
                color   = 'success'
                style   = {Object.assign({}, callBarBtn, { marginLeft: 35 })}
                onClick = {() => this.props.callingStore.setIsCallNotesSelected(true)}
                outline
              >
                Notes
              </Button>
            }
          </ReactCSSTransitionGroup>
        </Col>

        <Col md='4'>
          <ReactCSSTransitionGroup
            transitionName         = 'callBar'
            transitionEnterTimeout = {500}
            transitionLeaveTimeout = {200}
          >
            {this.renderButtons()}
          </ReactCSSTransitionGroup>
        </Col>
      </Row>
    )
  }
}
