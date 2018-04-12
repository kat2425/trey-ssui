import React                       from 'react'
import { storiesOf }               from '@storybook/react'
import { action }                  from '@storybook/addon-actions'
import { text, select, withKnobs } from '@storybook/addon-knobs'

import SSButton                    from '../'

const stories = storiesOf('SSButton', module) // eslint-disable-line
const isLoading = true

stories.addDecorator(withKnobs)
stories.add('default', () =>
  <div>
    <SSButton>No Icon</SSButton>
    <SSButton onClick={action('Button Clicked')} loading={isLoading}>
      Test passing prop
    </SSButton>
    <SSButton loading>
      Test set loading
    </SSButton>
    <SSButton onClick={action('Button Clicked')} iconClass='icon icon-pencil'>
      Test w/icon
    </SSButton>
    <SSButton onClick={action('Button Clicked')} iconClass='icon icon-flag' loading>
      Test w/icon loading
    </SSButton>
    <SSButton color="danger">
      Danger
    </SSButton>
    <SSButton color="danger" loading>
      Danger loading
    </SSButton>
    <SSButton outline color="danger" loading>
      Danger ghost
    </SSButton>
    <SSButton outline disabled color="danger" loading>
      Disabled Danger ghost
    </SSButton>
  </div>
)

stories.add('tooltip', () => 
  <SSButton 
    className = 'mt-5 ml-5'
    tooltip   = {text('tooltip', 'Tooltip here')}
    placement = {select('placement', ['top', 'right', 'bottom', 'left'], 'top' )}
    color     = "primary"
  >
    Button With Tooltip
  </SSButton>
)
