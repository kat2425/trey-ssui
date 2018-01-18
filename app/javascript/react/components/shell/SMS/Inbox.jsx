import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { observer }         from 'mobx-react'

import { Media } from 'reactstrap'
import InboxItem from './InboxItem'

@observer
export default class Inbox extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  handleSelect = (msg) => () => {
    this.props.handleSelect(msg.conversation_id, msg.broker.contact)
  }

  renderItem(msg) {
    return (
      <li key={msg.id} onClick = {this.handleSelect(msg)}>
        <InboxItem
          key       = {msg.id}
          read      = {msg.read_status}
          direction = {msg.direction}
          name      = {msg.broker.contact.name}
          time      = {msg.created_at}
          message   = {msg.body}
          media     = {msg.media_url}
          studentId = {msg.broker.contact.student_id}
        />
      </li>
    )
  }

  render() {
    return (
      <Media tag='div' className='media-list-users list-group' list>
        {this.props.messages.map(m => {
          return this.renderItem(m)
        })}
      </Media>
    )
  }
}
