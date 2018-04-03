import React           from 'react'
import { storiesOf }   from '@storybook/react'
import CommsTranslator from '../'
import Message         from 'stores/models/Message'

import { 
  text,
  color,
  withKnobs
} from '@storybook/addon-knobs'

const stories = storiesOf('CommsTranslator', module) // eslint-disable-line

const json = {
  id:              '8d0c91b9-2803-439f-8ce0-7e78a25c978d',
  conversation_id: 'bdbad66c-4073-4c02-91df-e26b5a951325',
  created_at:      '2018-03-05T11:36:27.309-06:00',
  direction:       'inbound',
  sent_state:      'received',
  body:            'Hola amigo',
  read_status:     true,
  media_url:       null,
  language:        'es',
  meta:            {
    translations: {
      'en': 'Hi friend'
    }
  },
  contact: {
    id:           '2db82263-47cd-4ea1-b34a-d04aa335aec0',
    name:         'Sandberry, Hogan',
    phone:        '3373563837',
    relationship: 'Wise Uncle'
  }
}

const store = new Message(null, json)

stories.addDecorator(withKnobs)
stories.add('default', () => 
  <div className='m-2'>
    <CommsTranslator 
      store       = {store}
      color       = {color('color', '#000')}
      className   = {text('className', '')}
    />
  </div>
)
