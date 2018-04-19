import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-react'

import smsInboxStore        from 'stores/SMSInboxStore'
import SMSInboxController   from 'ui/controllers/SMSInboxController'

import SMSController        from 'ui/controllers/SMSController'
import smsConversationStore from 'stores/SMSConversationStore'

const containerStyle = () => ({
  position:      'fixed',
  top:           0,
  right:         0,
  height:        '100%',
  zIndex:        1029,
  pointerEvents: 'none',
  minWidth:      365
})

const barStyle = () => ({
  backgroundColor: '#e8e8e8',
  zIndex:          1029,
  pointerEvents:   'all',
  width:           '100%',
  borderLeft:      '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '0 -1px 2px 0 rgba(0,0,0,0.25), 0 -1px 6px rgba(0,0,0,0.175)',
  position:        'absolute',
  top:             0,
  bottom:          0,
  right:           0
})

@inject('uiStore')
@observer
export default class Sidebar extends Component {
  static propTypes = {
    children:     PropTypes.node,
    className:    PropTypes.string,
    conversation: PropTypes.string,
    contact:      PropTypes.object
  }

  selectConversation = (conversation, contact) => {
    const { uiStore } = this.props

    uiStore.setShowInbox(false)
    uiStore.setCurrentContact(contact)
    uiStore.setCurrentConversation(conversation)

    smsConversationStore.setAllAsRead(conversation)
  }

  backToInbox = () => {
    this.props.uiStore.setShowInbox(true)
  }

  renderInbox() {
    return (
      <SMSInboxController
        handleSelect     = {this.selectConversation}
        store            = {smsInboxStore}
      />
    )
  }

  renderConversation() {
    const { uiStore } = this.props

    return (
      <SMSController
        handleBack       = {this.backToInbox}
        conversation     = {uiStore.currentConversation}
        contact          = {uiStore.currentContact}
        store            = {smsConversationStore}
      />
    )
  }

  render() {
    const {uiStore} = this.props
    const isSecondary = true
    // const isSecondary = uiStore.sidebarMaxHeight ?  true : false

    return (
      <div className='col-md-3' style={containerStyle(isSecondary)}>
        <div style={barStyle(isSecondary)}>
          { uiStore.showInbox ? this.renderInbox() : this.renderConversation() }
        </div>
      </div>
    )
  }
}
