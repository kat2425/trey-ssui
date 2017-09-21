import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import keycode              from 'keycode'

import SMSConversationStore from 'stores/SMSConversation'

import { Input, InputGroupButton, InputGroup, Button } from 'reactstrap'

const inputStyle = {
  backgroundColor: 'rgb(245,245,245)',
  borderTop:       '1px solid rgba(255,255,255,0.75)',
  borderBottom:    '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '0 -1px 1px rgba(0,0,0,0.15)',
  height:          52
}

export default class ChatInput extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { message: '', attachment: null }
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  handleAttachmentChange = (e) => {
    this.setState({ attachment: e.target.files[0] })
  }

  handleSubmit = (e) => {
    if (keycode(e) === 'enter') {
      this.sendMessage(this.state.message)
    }
  }

  handleAddAttachment = () => {
    this.attachmentInput.click()
  }

  sendMessage = (msg) => {
    if (!!msg) {
      SMSConversationStore.sendMessage(msg, this.props.contact.id, this.state.attachment)
      this.setState({ message: '', attachment: null })
    }
  }

  render() {
    return (
      <div className='p-2' style={inputStyle}>
        <InputGroup>
          <InputGroupButton>
            <Button onClick={::this.handleAddAttachment} color={this.state.attachment ? 'info' : 'secondary' }>
              <span className={this.state.attachment ? '' : 'text-muted'}>
                <span className='icon icon-attachment'/>
              </span>
            </Button>
          </InputGroupButton>
          <Input 
            onChange    = {this.handleChange}
            onKeyUp     = {this.handleSubmit}
            value       = {this.state.message}
            placeholder = 'Message'
          />
          <input ref={(input) => {this.attachmentInput = input} } type='file' onChange={this.handleAttachmentChange} style={{display: 'none'}}/>
        </InputGroup>
      </div>
    )
  }
}
