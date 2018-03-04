import React                 from 'react'
import VisibilitySensor      from 'react-visibility-sensor'
import moment                from 'moment'
import {UncontrolledTooltip} from 'reactstrap'
import ChatBubbleMMS         from './ChatBubbleMMS'

const ChatBubble = (props) => {
  const bubbleDirection = (props.direction === 'outbound') ? 'media-current-user ml-5' : 'mr-5'
  const footerDirection = (props.direction === 'outbound') ? 'float-right mr-3'        : 'ml-3'

  const renderFooter = () => {
    if (props.time) {
      return (
        <div className={`media-footer mb-3 text-muted ${footerDirection}`}>
          <small id={props.msgID}>sent {timeFromNow()}</small>
          <UncontrolledTooltip
            placement = 'left'
            target    = {props.msgID}
          >
            {moment(props.time, 'YYYY-MM-DD hh:mm:ss +ZZ').format('MMM DD YYYY hh:mm:ss a').toString()}
          </UncontrolledTooltip>
        </div>
      )
    }
  }

  const timeFromNow = () => {
    if (props.time) {
      return moment(props.time, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow()
    }
  }

  const onChange = (isVisible) => {
    if (!props.isRead && isVisible && (props.direction === 'inbound')) {
      props.setRead(props.msgID)
    }
  }

  return (
    <li className={`media ${bubbleDirection} mb-2`}>
      <VisibilitySensor onChange={onChange}>
        <div className='media-body'>
          <div className='media-body-text'>
            { props.media && <ChatBubbleMMS src={props.media}/> }
            { props.text }
          </div>

          { renderFooter() }
        </div>
      </VisibilitySensor>
    </li>
  )
}

ChatBubble.defaultProps = {}

ChatBubble.propTypes = {}

export default ChatBubble