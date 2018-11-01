import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'

import { Media }           from 'reactstrap'
import _                   from 'lodash'
import InboxItem           from './InboxItem'

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
      <InboxItem
        onClick      = {this.handleSelect(msg)}
        relationship = {_.get(msg.broker.contact, 'relationship', '')}
        key          = {msg.id}
        totalUnread  = {msg.total_unread}
        direction    = {msg.direction}
        name         = {_.get(msg.broker.contact, 'name', '')}
        time         = {msg.created_at}
        message      = {msg.body}
        media        = {msg.media_url}
        studentId    = {_.get(msg.broker.contact, 'student_id','')}
        studentName  = {_.get(msg.broker.contact, 'student.full_name', '')}
      />
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
