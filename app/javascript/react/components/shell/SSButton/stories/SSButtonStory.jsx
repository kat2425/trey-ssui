import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'

import SSButton      from '../'

const stories = storiesOf('SSButton', module) // eslint-disable-line
const isLoading = true

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