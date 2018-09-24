import React, { Component } from 'react'
import _                    from 'lodash'

import Wrapper              from './Wrapper'
import Footer               from './Footer'
import Input                from './Input'
import Placeholder          from './Placeholder'
import SendButton           from './SendButton'
import Counter              from './Counter'
import AttachmentWrapper    from './AttachmentWrapper'
import AttachmentButton     from './AttachmentButton'
import Attachment           from 'ui/shell/Attachment'
import TranslationContainer from 'ui/shell/TranslationContainer'

import smsConversationStore from 'stores/SMSConversationStore'
import { STATE }            from 'stores/models/Translator'
import userStore            from 'stores/UserStore'

const CHAR_LIMIT = 160
const DEFAULT_PLACEHOLDER = 'Enter your message here...'

export default class ChatInput extends Component {
  state = {
    message:         '',
    attachment:      null,
    textCounter:     CHAR_LIMIT,
    isTranslating:   false,
    showPlaceholder: true
  }

  handleChange = (e) => {
    const text = e.nativeEvent.target.innerText.trim()

    this.setMessage(text)
  }

  setMessage = (text) => {
    this.setState({ 
      message:     text,
      textCounter: CHAR_LIMIT - text.length,
    })

    this.showPlaceholder(!text)
  }

  handleKeyPress = (e) => {
    if(e.charCode === 13 && !e.shiftKey) {
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

  showPlaceholder = (showPlaceholder) => {
    this.setState({showPlaceholder})
  }

  sendMessage = (msg) => {
    if(!msg && !this.attachmentInput.value) return
    smsConversationStore.sendMessage(
      msg,
      this.props.contact.id,
      this.state.attachment
    )

    this.smsInput.innerHTML = ''
    this.attachmentInput.value = null

    this.setState({
      message:     '',
      attachment:  null,
      textCounter: CHAR_LIMIT
    })
  }

  handleOnTranslate = (isError, translatedText) => {
    if(isError) return

    this.smsInput.innerHTML = translatedText
    this.setMessage(translatedText)
  }

  handleOnTranslating = (isTranslating) => {
    this.setState({isTranslating})
  }

  render() {
    const {textCounter, attachment, isTranslating, showPlaceholder} = this.state
    const isOverLimit   = textCounter < 0
    const disableButton = textCounter === CHAR_LIMIT && !attachment

    return (
      <Wrapper>
        <Input 
          innerRef                       = {el => {this.smsInput = el}}
          onInput                        = {this.handleChange}
          onKeyPress                     = {this.handleKeyPress}
          onFocus                        = {() => this.showPlaceholder(false)}
          onBlur                         = {() => this.showPlaceholder(!this.state.message)}
          suppressContentEditableWarning = {true}
        >
          {showPlaceholder && <Placeholder>{this.props.placeholder || DEFAULT_PLACEHOLDER}</Placeholder>}
        </Input>
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
          {userStore.user.hasChannel && (
            <TranslationContainer
              className       = 'mx-2'
              style           = {{marginTop: -17}}
              onTranslating   = {this.handleOnTranslating}
              onTranslate     = {this.handleOnTranslate}
              renderLabel     = {() => <p>Translate to</p>}
              textToTranslate = {this.state.message}
              state           = {STATE.SELECT_ONLY}
              disabled        = {disableButton}
            />
          )}
          <Counter isOverLimit={isOverLimit} counter={textCounter} />
          <SendButton onClick={this.handleSubmit} disabled={disableButton || isTranslating}>
            Send
          </SendButton>
        </Footer>
      </Wrapper>
    )
  }
}
