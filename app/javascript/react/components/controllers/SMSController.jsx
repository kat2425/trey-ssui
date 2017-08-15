import React, { Component}  from 'react'
import PropTypes            from 'prop-types'

import ChatInput            from 'ui/shell/SMS/ChatInput'
import SMS                  from 'ui/shell/SMS/SMS'
import ConversationHeader   from 'ui/shell/SMS/ConversationHeader'

const conversationStyle = {
  backgroundColor: 'rgb(244,247,249)',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'auto',
}

const fooStyle = {
  backgroundColor: '#ffffff',
  borderTop: '1px solid rgba(255,255,255,0.75)',
  borderBottom: '1px solid rgba(0,0,0,0.125)',
  boxShadow: '0 1px 1px rgba(0,0,0,0.15)',
  position: 'absolute',
  width: '100%',
  height: '103px',
  top: 57
}

const redContainer = {
  backgroundColor: 'rgb(244,247,249)',
  position: 'absolute',
  width: '100%',
  top: '160px',
  bottom: '50px',
  overflow: 'auto'
}

const redStyle = {
  overflow: 'auto'
}

const yellowStyle = {
  height: 52,
  position: 'absolute',
  bottom: 50,
  borderBottom: '1px solid rgba(0,0,0,0.25)',
  width: '100%'
}

export default class SMSController extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={conversationStyle}>

        <div style={fooStyle}>
          <ConversationHeader handleBack={::this.props.handleBack} store={this.props.store}/>
        </div>

        <div style={redContainer}>
          <div style={redStyle}>
            <SMS conversation={this.props.conversation} store={this.props.store}/>
          </div>
        </div>

        <div style={yellowStyle}>
          <ChatInput contact={this.props.contact}/>
        </div>
      </div>
    )
  }
}
