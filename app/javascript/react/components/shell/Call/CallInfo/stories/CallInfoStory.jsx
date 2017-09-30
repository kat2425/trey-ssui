import React         from 'react'
import { storiesOf } from '@storybook/react'
import _             from 'lodash'
import { action }    from '@storybook/addon-actions'

import {test_data}   from 'ui/shell/Call'
import Call          from 'stores/models/Call'
import CallInfo      from '../'


const stories = storiesOf('CallInfo', module)

const {call_log} = test_data
const call = new Call(null, call_log)
const onGoBack = action('onGoBack')

const store = {
  selectedCall: call,
  isLoading:    false
}

stories.add('default', () => 
  <CallInfo 
    show 
    store={_.create(store, {descCalls: []})}
    onGoBack={onGoBack}
  />
)
