import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer }          from 'mobx-react'
import {
  Navbar, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

const style = {
  callBar: {
    zIndex: 9999,
    backgroundColor: 'rgba(63, 159, 207, 0.95)',
    padding: 15
  },
  callBarDisable: {
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255, 0.95)',
    padding: 15
  },
  callBarCallText: {
    color: 'white',
    margin: '0 auto'
  },
  callBarEndText: {
    color: '#d64747',
    margin: '0 auto'
  },
  callBarBtn: {
    color: '#8DA1B9',
    backgroundColor: 'white',
    margin: 0
  }
}

@observer
export default class CallingController extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  renderBar() {
    const { callBar, callBarDisable, callBarCallText, callBarBtn, callBarEndText } = style
    const { isCalling } = this.props.store
      return (
        <Navbar style={isCalling ? callBar : callBarDisable} fixed='top'>
          <Row>
            <Col sm="8">
              <h2 style={ isCalling ? callBarCallText : callBarEndText}><span className="icon icon-phone"> </span>{ isCalling ? `Calling ${this.props.store.contactName}` : 'Call Ended' }</h2>
            </Col>
            <Col sm="4">
              { isCalling ? <Button className='float-right' style={callBarBtn} onClick={() => this.props.store.hangUp()}>Hang up</Button> : null}
            </Col>
          </Row>
        </Navbar>
      )
  }

  render() {
    const { callBarVisible, selectCall, selectCallOption, contact, studentId } = this.props.store
    return (
      <div style={{zIndex: 9999}}>
          {callBarVisible &&
          <div>{this.renderBar()}</div>}
          <Modal style={{zIndex: 99999}} isOpen={selectCall}>
          <ModalHeader>Call</ModalHeader>
          <ModalBody>
            <div className="p-2">
              <Button color="primary" onClick={() => {selectCallOption(false); this.props.store.call(contact, studentId)}}>Call Using My Computer (Free)</Button>
            </div>
            <div className="p-2">
              <Button color="secondary" onClick={() => this.props.store.initiateConferenceCall(contact, studentId)}>Call Using My Cell Phone</Button>
            </div>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
