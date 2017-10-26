import React, { Component }    from 'react'
import _                       from 'lodash'

import SMSConversationStore    from 'stores/SMSConversation'

import Wrapper                 from './Wrapper'
import Footer                  from './Footer'
import Input                   from './Input'
import SendButton              from './SendButton'
import Counter                 from './Counter'
import AttachmentWrapper       from './AttachmentWrapper'
import AttachmentButton        from './AttachmentButton'
import Attachment              from 'ui/shell/Attachment'

const CHAR_LIMIT = 160

export default class ChatInput extends Component {
  state = {
    message:     '',
    attachment:  null,
    textCounter: CHAR_LIMIT
  }

  handleChange = (e) => {
    const text = e.nativeEvent.target.innerText.trim()

    this.setState({ 
      message:     text,
      textCounter: CHAR_LIMIT - text.length
    })
  }

  handleKeyPress = (e) => {
    if(e.charCode == 13 && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage(this.state.message)
    }
  }

  handleAttachmentChange = (e) => {
    const files = e.target.files

    if(_.isEmpty(files)) return
    this.setState({ attachment: files[0] })
  }

  handleSubmit = () => {
    this.sendMessage(this.state.message)
  }

  handleAddAttachment = () => {
    this.attachmentInput.click()
  }

  clearAttachment = () => {
    this.setState({ attachment: null })
  }

  sendMessage = (msg) => {
    if(!msg) return

    SMSConversationStore.sendMessage(msg, this.props.contact.id, this.state.attachment)

    this.smsInput.innerHTML = ''
    this.attachmentInput.value = null

    this.setState({ 
      message:     '',
      attachment:  null,
      textCounter: CHAR_LIMIT
    })
  }

  render() {
    const {textCounter, attachment} = this.state
    const isOverLimit               = textCounter < 0
    const disableButton             = textCounter === CHAR_LIMIT

    return (
      <Wrapper>
        <Input 
          innerRef   = {el => {this.smsInput = el}}
          onInput    = {this.handleChange}
          onKeyPress = {this.handleKeyPress}
        />
        <input 
          ref      = {(input) => {this.attachmentInput = input} }
          accept   = 'image/*'
          type     = 'file'
          onChange = {this.handleAttachmentChange}
          style    = {{display: 'none'}}
        />
        {attachment && (
          <AttachmentWrapper>
            <Attachment src={URL.createObjectURL(attachment)} onClear={this.clearAttachment} />
          </AttachmentWrapper>
        )}
        <Footer>
          <AttachmentButton onClick={this.handleAddAttachment} />
          <Counter isOverLimit={isOverLimit} counter={textCounter} />
          <SendButton onClick={this.handleSubmit} disabled={disableButton}>Send</SendButton>
        </Footer>
      </Wrapper>
    )
  }
}
