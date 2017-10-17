import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import keycode              from 'keycode'

import SMSConversationStore from 'stores/SMSConversation'

import { Input, InputGroupButton, InputGroup, Button } from 'reactstrap'

const inputStyle = {
  backgroundColor: 'rgb(245,245,245)',
  borderTop:       '1px solid rgba(255,255,255,0.75)',
  borderBottom:    '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '0 -1px 1px rgba(0,0,0,0.15)'
}

const customInput = {
  width:      '100%', 
  background: 'white', 
  maxHeight:  300, 
  border:     'solid thin lightgray', 
  overflow:   'auto',
  outline:    'none',
  padding:    '0px 5px'
}

export default class ChatInput extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { message: '', attachment: null }
  }

  handleChange = (e) => {
    this.setState({ message: e.nativeEvent.target.textContent })
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
      this.smsInput.innerHTML = ''
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
          <div 
            ref     = {(input) => {this.smsInput = input} }
            onKeyUp = {this.handleSubmit} 
            onInput = {this.handleChange} 
            style   = {customInput} 
            contentEditable
          >
          </div>
          <input ref={(input) => {this.attachmentInput = input} } type='file' onChange={this.handleAttachmentChange} style={{display: 'none'}}/>
        </InputGroup>
      </div>
    )
  }
}
