import React         from 'react'
import { storiesOf } from '@storybook/react'

import DumbContainer from '../DumbContainer'

import ChatBubble    from '../SMS/ChatBubble'
import Conversation  from '../SMS/Conversation'
import InboxItem     from '../SMS/InboxItem'
import Inbox         from '../SMS/Inbox'

import SMSController from '../../controllers/SMSController'
import SMSConversationStore from '../../../stores/SMSConversation'

const stories = storiesOf('SMS', module)

stories.add('ChatBubble', () => (
  <div>
    <DumbContainer title='ChatBubble (incoming)'>
      <ul className='media-list media-list-conversation c-w-md'>
        <ChatBubble direction='incoming' text='what are we doing?' time='now'/>
      </ul>
    </DumbContainer>

    <DumbContainer title='ChatBubble (outgoing)'>
      <ul className='media-list media-list-conversation c-w-md'>
        <ChatBubble direction='outbound' text='not too much' time='then'/>
      </ul>
    </DumbContainer>
  </div>
))

const messages = [
  {
    direction: 'incoming',
    text: 'hello there pal',
    time: 'now'
  },
  {
    direction: 'incoming',
    text: 'what is life?',
    time: 'now'
  },
  {
    direction: 'outgoing',
    text: 'i think 47',
    time: 'now'
  },
  {
    direction: 'incoming',
    text: 'close enough',
    time: 'now'
  },
]

stories.add('Conversation', () => (
  <DumbContainer title='Conversation'>
    <Conversation messages={messages} />
  </DumbContainer>
))

stories.add('InboxItem', () => (
  <DumbContainer title='InboxItem'>
    <InboxItem name='Smith, Joe' time='just now' message='hello there friendo'/>
  </DumbContainer>
))

stories.add('Inbox', () => (
  <DumbContainer title='Inbox'>
    <Inbox/>
  </DumbContainer>
))

stories.add('Controller', () => (
  <DumbContainer title='Controller'>
    <SMSController store={SMSConversationStore}/>
  </DumbContainer>
))
