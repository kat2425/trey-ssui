import React         from 'react'
import { storiesOf } from '@storybook/react'
import _             from 'lodash'

import {test_data}   from 'ui/shell/Call'
import Call          from 'stores/models/Call'
import CallSidebar   from '../'


const stories = storiesOf('CallSidebar')

const {call_log} = test_data
const call = new Call(null, call_log)

const store = {
  descCalls: _.times(10 , () => call), // duplicate 10 times
  isLoading: false
}

stories.add('empty', () => 
  <CallSidebar 
    show 
    store={_.create(store, {descCalls: []})}
  />
)

stories.add('loading', () => 
  <CallSidebar 
    show 
    store={_.create(store, {isLoading: true})}
  />
)

stories.add('100 entries', () => 
  <CallSidebar 
    show 
    store={_.create( store, {
      descCalls: _.times(100, () => call)
    })}
  />
)
