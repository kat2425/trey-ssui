import React         from 'react'
import { storiesOf } from '@storybook/react'
import ChatInput     from '../'

import { withKnobs } from '@storybook/addon-knobs'

const stories = storiesOf('ChatInput', module)

stories.addDecorator(withKnobs)
stories.add('ChatInput', () => 
  <div className='p-4 mt-3'>
    <ChatInput />
  </div>
)

