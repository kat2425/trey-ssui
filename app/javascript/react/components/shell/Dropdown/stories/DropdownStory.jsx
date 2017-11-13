import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import Dropdown      from '../'

const stories = storiesOf('Dropdown', module)

stories.addDecorator(withKnobs)
stories.add('Dropdown', () => 
  <div>
    <Dropdown
      labelKey      = 'myLabel'
      valueKey      = 'id'
      onSelect      = {action('onSelect')}
      options       = {[
        {'myLabel': 'Check', 'id':        1}, 
        {'myLabel': 'Check it', 'id':     2},
        {'myLabel': 'Check it out', 'id': 3}
      ]}
      dropdownLabel = 'Group into Export' 
    />
  </div>
)
