import React, { Component} from 'react'
import { observer }        from 'mobx-react'

import ChatBubble          from './ChatBubble'
import uiStore             from 'stores/UiStore'

@observer
export default class Conversation extends Component {
  constructor(props) {
    super(props)
  }

  scrollToBottom() {
    this.endOfMessages.scrollIntoView()
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    uiStore.shouldScrollToBottom && this.scrollToBottom()
  }

  componentWillUnmount() {
    this.props.messages.forEach(m => m.dispose())
  }

  getTime = (msg, index) => {
    if ((index + 1) < this.props.messages.length) {
      return (this.props.messages[index + 1].direction !== msg.direction) ? msg.createdAt : null
    } else {
      return msg.createdAt
    }
  }

  renderMessage(msg, index) {
    return (
      <ChatBubble
        key     = {msg.id}
        message = {msg}
        time    = {this.getTime(msg, index)}
        setRead = {this.props.setRead}
      />
    )
  }

  render() {
    return (
      <ul className='media-list media-list-conversation c-w-md'>
        {this.props.messages.map((m,i) => {
          return this.renderMessage(m,i)
        })}

        <li ref={(el) => {this.endOfMessages = el}}/>
      </ul>
    )
  }
}
