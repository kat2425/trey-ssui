import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import TagActionBar  from '../'

const stories = storiesOf('ActionBar', module)

stories.addDecorator(withKnobs)
stories.add('ActionBar', () => 
  <div>
    <TagActionBar 
      onCSVClick       = {action('csv clicked')} 
      onDropdownSelect = {action('onDropdownSelect')} 
      onMapClick       = {action('map clicked')}
    />
  </div>
)
