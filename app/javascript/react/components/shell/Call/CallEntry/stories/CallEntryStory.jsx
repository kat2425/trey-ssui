import React         from 'react'
import { storiesOf } from '@storybook/react'

import CallEntry     from '../'
import {test_data}   from 'ui/shell/Call'
import Call          from 'stores/models/Call'

const stories    = storiesOf('CallEntry', module)
const {call_log} = test_data
const missedCall = {dial_call_status: 'no-answer'}
const incoming   = {direction: 'incoming'}

stories.add('default', () => { 
  const store = new Call(null, call_log)

  return <CallEntry call={store}/>
})

stories.add('incoming', () => { 
  const store = new Call(null, {...call_log, ...incoming})

  return <CallEntry call={store}/>
})

stories.add('missed call', () => { 
  const store = new Call(null, {...call_log, ...missedCall})

  return <CallEntry call={store}/>
})

