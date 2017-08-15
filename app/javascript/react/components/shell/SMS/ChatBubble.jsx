import React     from 'react'
import PropTypes from 'prop-types'
import moment    from 'moment'

const ChatBubble = (props) => {
  const bubbleDirection = (props.direction === 'outbound') ? 'media-current-user ml-5' : 'mr-5'
  const footerDirection = (props.direction === 'outbound') ? 'float-right mr-3'        : 'ml-3'

  const renderFooter = () => {
    if (props.time) {
      return (
        <div className={`media-footer mb-3 text-muted ${footerDirection}`}>
          <small>sent {timeFromNow()}</small>
        </div>
      )
    }
  }

  const timeFromNow = () => {
    if (props.time) {
      return moment(props.time, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
    }
  }

  return (
    <li className={`media ${bubbleDirection} mb-2`}>
      <div className='media-body'>
        <div className='media-body-text'>
          {props.text}
        </div>

        { renderFooter() }
      </div>
    </li>
  )
}

ChatBubble.defaultProps = {}

ChatBubble.propTypes = {}

export default ChatBubble
