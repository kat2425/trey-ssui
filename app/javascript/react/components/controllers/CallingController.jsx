import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  Navbar, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Popover, PopoverContent, PopoverTitle,
  Collapse, Card, CardBlock
} from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@observer
export default class CallingController extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  renderDialPad() {
    const { selectDialPad, sendDigit, isDialPad } = this.props.store
    return (
      <Popover placement="bottom" isOpen={selectDialPad} target="Popover1" toggle={this.toggle}>
        <span style={{ padding: 5, fontSize: '1em' }} onClick={() => isDialPad(false)} className="icon icon-cross float-right"></span>
        <PopoverTitle>Dialpad</PopoverTitle>
        <PopoverContent style={{ textAlign: 'center' }}>
          <ButtonGroup size="lg">
            <Button onClick={() => sendDigit('1')}>1</Button>
            <Button onClick={() => sendDigit('2')}>2</Button>
            <Button onClick={() => sendDigit('3')}>3</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button onClick={() => sendDigit('4')}>4</Button>
            <Button onClick={() => sendDigit('5')}>5</Button>
            <Button onClick={() => sendDigit('6')}>6</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button onClick={() => sendDigit('7')}>7</Button>
            <Button onClick={() => sendDigit('8')}>8</Button>
            <Button onClick={() => sendDigit('9')}>9</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button onClick={() => sendDigit('*')}>*</Button>
            <Button onClick={() => sendDigit('0')}>0</Button>
            <Button onClick={() => sendDigit('#')}>#</Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    )
  }

  render() {
    const { selectCall, selectDialPad, selectConferenceCall, isConferenceCall, isCall, contact, studentId, buttonID, popoverOpen } = this.props.store
    return (
      <div style={{ zIndex: 9999 }}>
        {this.renderDialPad()}
        <Modal style={{ zIndex: 99999 }} isOpen={selectCall}>
          <ModalHeader>Place a Call</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            <ButtonGroup vertical>
              <Button
                style={{ marginBottom: 15 }}
                color="primary"
                onClick={() => { isCall(false); this.props.store.initiateCall(contact, studentId) }}>
                Call Using My Computer (Free)
                </Button>
              <Button color="secondary" onClick={() => isConferenceCall(!selectConferenceCall)}>Call Using My Cell Phone</Button>
            </ButtonGroup>
            <Collapse isOpen={selectConferenceCall}>
              <Card className='mt-4'>
                <CardBlock>
                  SchoolStatus will connect this call free of charge. We will call your chosen phone number, then connect you to the above contact.
                This will not reveal your phone number.While the call is free to connect, your phone provider will treat this as any other incoming
                call and will debit your minutes according to your phone plan. SchoolStatus nor your district/school are responsible for these charges.
                </CardBlock>
                <CardBlock>
                  <Button
                    onClick={() => this.props.store.initiateConferenceCall(contact, studentId)}
                    color="primary">
                    Proceed
                </Button>
                </CardBlock>
              </Card>
            </Collapse>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => { isCall(false); isConferenceCall(false); }}
              color="secondary">
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
