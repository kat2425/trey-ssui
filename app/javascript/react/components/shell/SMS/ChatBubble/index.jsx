import React                 from 'react'
import { observer }          from 'mobx-react'
import VisibilitySensor      from 'react-visibility-sensor'
import {UncontrolledTooltip} from 'reactstrap'
import ChatBubbleMMS         from './ChatBubbleMMS'
import withCommsTranslator   from 'ui/hoc/withCommsTranslator'
import styled                from 'styled-components'

const Text = styled.span`
  font-size: 14px;
  display: inline-block;
`
const EText = withCommsTranslator(Text)

const ChatBubble = ({message, setRead, time}) => (
  <li className={`media ${message.bubbleDirection} mb-2`}>
    <VisibilitySensor onChange={onChange(message, setRead)}>
      <div className='media-body'>
        <div className='media-body-text'>
          { message.mediaUrl && <ChatBubbleMMS src={message.mediaUrl}/> }
          <EText
            color     = {message.isOutbound ? '#fff' : '#657786'}
            store     = {message}
            className = 'mt-3'
          >
            { message.body }
          </EText>
        </div>

        { renderFooter(time, message) }
      </div>
    </VisibilitySensor>
  </li>
)

const renderFooter = (time, message) => {
  if (time) {
    return (
      <div className={`media-footer mb-3 text-muted ${message.footerDirection}`}>
        <small id={message.id}>sent {message.timeFromNow}</small>
        <UncontrolledTooltip
          placement = 'left'
          target    = {message.id}
        >
          {message.fullDateWithTime}
        </UncontrolledTooltip>
      </div>
    )
  }
}

const onChange = (message, setRead) => (isVisible) => {
  if (isVisible && message.shouldSetRead) {
    setRead(message.id)
  }
}

export default observer(ChatBubble)
