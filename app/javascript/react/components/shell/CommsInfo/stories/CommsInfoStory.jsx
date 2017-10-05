import React         from 'react'
import { storiesOf } from '@storybook/react'

import {test_data}   from 'ui/shell/Call'
import Communication from 'stores/models/Communication'
import CommoInfo     from '../'


const stories = storiesOf('CommoInfo', module)

const {comm} = test_data
const _comm    = new Communication(null, comm)

const store = {
  selectedComm: _comm,
  isLoading:    false
}

stories.add('default', () => 
  <CommoInfo 
    show 
    store={store}
  />
)
