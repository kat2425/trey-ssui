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

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  renderButtons = () => {
    const {
      isCalling,
      isConnected,
      selectMute,
      isMute,
      currentOutputDevice,
      changeOutput,
      outputDevices,
    } = this.props.callingStore

    return (
      isCalling && isConnected
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
        : null
    )
  }

  render() {
    const {
      isCalling,
      isConferenceCalling,
      callTime,
      contactName,
      isConnected
    } = this.props.callingStore

    return (
      <Row>
        <Col md='8' style={{ minWidth: 300 }}>
          <span className='icon icon-phone mr-2' />
          <span>
            {(isCalling
              ? `Calling ${contactName}`
              : (isConferenceCalling ? 'Expect a call shortly...' : 'Call Ended'))
            }
          </span>
          <span style={{ float: 'right' }}>{!isConferenceCalling && callTime ? callTime : null}</span>
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
                onClick = {() => this.props.callingStore.isCallNotes(true)}
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
