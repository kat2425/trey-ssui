import React         from 'react'
import { storiesOf } from '@storybook/react'

import {test_data}   from 'ui/shell/Call'
import Communication from 'stores/models/Communication'
import CommsInfo     from '../'


const stories = storiesOf('CommsInfo', module)

const {commCall, commSms, commEmail} = test_data

stories.add('call', () => {
  const _comm = new Communication(null, commCall)
  const store = {
    selectedComm: _comm,
    isLoading:    false
  }

  return(  
    <CommsInfo 
      show 
      store={store}
    />
  )
})

stories.add('sms', () => {
  const _comm = new Communication(null,commSms)
  const store = {
    selectedComm: _comm,
    isLoading:    false
  }

  return(  
    <CommsInfo 
      show 
      store={store}
    />
  )
})

stories.add('email', () => {
  const _comm = new Communication(null, commEmail)
  const store = {
    selectedComm: _comm,
    isLoading:    false
  }

  return(  
    <CommsInfo 
      show 
      store={store}
    />
  )
})
