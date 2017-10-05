import React         from 'react'
import { storiesOf } from '@storybook/react'

import CommsItem     from '../'
import {test_data}   from 'ui/shell/Call'
import Communication from 'stores/models/Communication'
import {CommsStore}  from 'stores/CommsStore'

const stories    = storiesOf('CommsItem')
const {comm}     = test_data
const missedCall = {call_status: 'no-answer'}
const incoming   = {direction: 'incoming'}
const text       = {type: 'sms'}

const commStore = new CommsStore()

stories.add('default', () => { 
  const store = new Communication(commStore, comm)

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('incoming', () => { 
  const store = new Communication(commStore, {...comm, ...incoming})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('missed call', () => { 
  const store = new Communication(commStore, {...comm, ...missedCall})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('text', () => { 
  const store = new Communication(commStore, {...comm, ...text})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

