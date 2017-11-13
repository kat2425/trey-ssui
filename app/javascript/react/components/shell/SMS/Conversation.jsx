import React, { Component} from 'react'
import PropTypes           from 'prop-types'
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

  renderMessage(msg, index) {
    const {id, direction, body, media_url, read_status, created_at} = msg

    // TODO: extract to function
    const time = do {
      if ((index + 1) < this.props.messages.length) {
        (this.props.messages[index + 1].direction !== direction) ? created_at : null
      } else {
        created_at
      }
    }

    return <ChatBubble
      key       = {id}
      msgID     = {id}
      direction = {direction}
      text      = {body}
      media     = {media_url}
      time      = {time}
      isRead    = {read_status}
      setRead   = {this.props.setRead}
    />
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
