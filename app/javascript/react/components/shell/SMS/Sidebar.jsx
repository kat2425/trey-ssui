import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SMSInboxStore from 'stores/SMSInbox'
import SMSInboxController from 'ui/controllers/SMSInboxController'

import SMSConversationStore from 'stores/SMSConversation'
import SMSController from 'ui/controllers/SMSController'

const containerStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  zIndex: 1029,
  pointerEvents: 'none',
}

const barStyle = {
  backgroundColor: '#e8e8e8',
  zIndex: 1029,
  pointerEvents: 'all',
  width: '100%',
  borderLeft: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.25), 0 -1px 6px rgba(0,0,0,0.175)',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0
}

export default class Sidebar extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      showInbox:           true,
      currentConversation: null
    }
  }

  selectConversation(conversation, contact) {
    this.setState({ showInbox: false, currentConversation: conversation, currentContact: contact })
  }

  backToInbox() {
    this.setState({ showInbox: true })
  }

  renderInbox() {
    return <SMSInboxController handleSelect={::this.selectConversation} store={SMSInboxStore}/>
  }

  renderConversation() {
    return <SMSController
      handleBack   = {::this.backToInbox}
      conversation = {this.state.currentConversation}
      contact      = {this.state.currentContact}
      store        = {SMSConversationStore}
    />
  }

  render() {
    return (
      <div className='col-md-3' style={containerStyle} hidden={this.props.hidden}>
        <div style={barStyle}>
          { this.state.showInbox ? this.renderInbox() : this.renderConversation() }
        </div>
      </div>
    )
  }
}
