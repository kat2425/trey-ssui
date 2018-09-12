import React                 from 'react'
import { observer }          from 'mobx-react'
import VisibilitySensor      from 'react-visibility-sensor'
import {UncontrolledTooltip} from 'reactstrap'
import { Icon }              from 'antd'
import ChatBubbleMMS         from './ChatBubbleMMS'
import withCommsTranslator   from 'ui/hoc/withCommsTranslator'
import styled                from 'styled-components'
import {ifProp}              from 'styled-tools'
import smsConversationStore  from 'stores/SMSConversationStore'
import LoadingSpinner        from 'ui/shell/LoadingSpinner'

const Text = styled.span`
  font-size: 14px;
  display: inline-block;
`
const EText = withCommsTranslator(Text)

const ChatWithBroadcast = styled.div.attrs({ className: 'media-body-text'})`
  ${ifProp('isBroadcast', `
    background-color: #FF9800 !important;
    color:            #fff !important;
  `)}
`

const ChatBubble = ({message, setRead, time}) => (
  <li className={`media ${message.bubbleDirection} mb-2`}>
    <VisibilitySensor onChange={onChange(message, setRead)}>
      <div className='media-body'>
        <ChatWithBroadcast isBroadcast={message.broadcastId}>
          { message.mediaUrl && <ChatBubbleMMS src={message.mediaUrl}/> }
          <EText
            color     = {message.isOutbound ? '#fff' : '#657786'}
            store     = {message}
            className = 'mt-3'
          >
            { message.body }
          </EText>
          { message.broadcastId
            ? <small>This message was sent to multiple recipients.</small>
            : null
          }
        </ChatWithBroadcast>
        {message.shouldShowRetry && renderRetry(message)}
        { renderFooter(time, message) }
      </div>
    </VisibilitySensor>
  </li>
)

const renderRetry = (msg) => {
  if(msg.isRetrying) {
    return (
      <LoadingSpinner padding={0} className='d-flex flex-row justify-content-start my-1' />
    )
  }

  return (
    <div 
      className='cursor-pointer d-flex align-items-center my-1' 
      onClick={() => smsConversationStore.retryMessage(msg)}
    >
      <Icon style={{ color: 'tomato' }} type='exclamation-circle' theme='outlined' />
      <p className='text-danger small ml-1 mb-0'>Failed to send. Click to retry.</p>
    </div>
  )
}

const renderFooter = (time, message) => {
  if (time) {
    return (
      <div className={`media-footer mb-3 text-muted ${message.footerDirection}`}>
        <small id={`id-${message.id}`}>sent {message.timeFromNow}</small>
        <UncontrolledTooltip
          placement = 'left'
          target    = {`id-${message.id}`}
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
