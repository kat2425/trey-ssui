import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import SMSInboxStore from 'stores/SMSInbox'
import SMSInboxController from 'ui/controllers/SMSInboxController'

import SMSConversationStore from 'stores/SMSConversation'
import SMSController from 'ui/controllers/SMSController'

import fireEvent from 'helpers/FireEvent'

const containerStyle = secondary => ({
  position:        'fixed', 
  top:             0,
  right:           0,
  height:          '100%',
  zIndex:          secondary ? 10290 : 1029,
  pointerEvents:   'none',
})

const barStyle = secondary => ({
  backgroundColor: '#e8e8e8',
  zIndex:          secondary ? 10290 : 1029,
  pointerEvents:   'all',
  width:           '100%',
  borderLeft:      '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '0 -1px 2px 0 rgba(0,0,0,0.25), 0 -1px 6px rgba(0,0,0,0.175)',
  position:        'absolute',
  top:             0,
  bottom:          0,
  right:           0
})

const closeStyle = secondary => ({
  lineHeight: '22px',
  top:        secondary ? 5 : '62px',
  position:   'absolute',
  fontSize:   18,
  right:      8,
  zIndex:     99999
})

const CloseBtn = ({onClick, secondary}) => (
  <div style={closeStyle(secondary)}>
    <span
      className = 'icon icon-cross text-muted'
      style     = {{lineHeight:'22px'}}
      onClick   = {onClick}
    />
  </div>
)

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
  }

  backToInbox = () => {
    this.props.uiStore.setShowInbox(true)
  }

  hideSidebar = () => {
    fireEvent('toggleSidebar')
  }

  renderInbox() {
    return (
      <SMSInboxController 
        handleSelect     = {this.selectConversation}
        store            = {SMSInboxStore}
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
        store            = {SMSConversationStore}
      />
    )
  }

  render() {
    const {uiStore} = this.props
    const isSecondary = uiStore.sidebarMaxHeight ?  true : false

    return (
      <div className='col-md-3' style={containerStyle(isSecondary)} hidden={uiStore.hideSidebar}>
        <div style={barStyle(isSecondary)}>
          <CloseBtn secondary={isSecondary} onClick={this.hideSidebar} />
          { uiStore.showInbox ? this.renderInbox() : this.renderConversation() }
        </div>
      </div>
    )
  }
}

