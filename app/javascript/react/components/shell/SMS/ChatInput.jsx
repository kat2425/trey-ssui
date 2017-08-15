import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

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
    this.state = { message: '' }
  }

  handleChange(e) {
    this.setState({ message: e.target.value })
  }

  handleSubmit(e) {
    if (keycode(e) === 'enter') {
      this.sendMessage(this.state.message)
    }
  }

  sendMessage(msg) {
    if (!!msg) {
      SMSConversationStore.sendMessage(msg, this.props.contact)
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <div className='p-2' style={inputStyle}>
        <InputGroup>
          <InputGroupButton>
            <Button>
              <span className='icon icon-attachment text-muted'/>
            </Button>
          </InputGroupButton>

          <Input onChange={::this.handleChange} onKeyUp={::this.handleSubmit} value={this.state.message} placeholder='Message'/>
        </InputGroup>
      </div>
    )
  }
}
