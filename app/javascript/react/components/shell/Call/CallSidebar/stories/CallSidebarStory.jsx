import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'
import _             from 'lodash'

import {test_data}   from 'ui/shell/Call'
import Call          from 'stores/models/Call'
import CallSidebar   from '../'


const stories = storiesOf('CallSidebar', module)

const {call_log} = test_data
const call = new Call(null, call_log)
const onClose = action('onClose')

const store = {
  descCalls: _.times(5 , () => call), // duplicate 
  isLoading: false
}

stories.add('empty', () => 
  <CallSidebar 
    show 
    store={_.create(store, {descCalls: []})}
    onClose={onClose}
  />
)

stories.add('loading', () => 
  <CallSidebar 
    show 
    store={_.create(store, {isLoading: true})}
    onClose={onClose}
  />
)

stories.add('100 entries', () => 
  <CallSidebar 
    show 
    store={_.create( store, {
      descCalls: _.times(100, () => call)
    })}
    onClose={onClose}
  />
)
