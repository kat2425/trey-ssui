import React         from 'react'
import { storiesOf } from '@storybook/react'

import CommsItem     from '../'
import {test_data}   from 'ui/shell/Call'
import Communication from 'stores/models/Communication'
import {CommsStore}  from 'stores/CommsStore'

const stories    = storiesOf('CommsItem')
const {commCall, commEmail, commSms}     = test_data
const missedCall = {call_status: 'no-answer'}
const incoming   = {direction: 'incoming'}
const text       = {type: 'sms'}
const voicemail  = {type: 'voicemail'}

const commStore = new CommsStore()

stories.add('default', () => { 
  const store = new Communication(commStore, commCall)

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('incoming', () => { 
  const store = new Communication(commStore, {...commCall, ...incoming})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('missed call', () => { 
  const store = new Communication(commStore, {...commCall, ...missedCall})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('text', () => { 
  const store = new Communication(commStore, commSms)

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('email', () => { 
  const store = new Communication(commStore, commEmail)

  return <div className='m-3'><CommsItem comm={store}/></div>
})

stories.add('voicemail', () => { 
  const store = new Communication(commStore, {...commCall, ...voicemail})

  return <div className='m-3'><CommsItem comm={store}/></div>
})

