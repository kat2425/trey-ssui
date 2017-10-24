import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'
import Attachment    from '../'

import { 
  text, 
  withKnobs
} from '@storybook/addon-knobs'

const stories = storiesOf('Attachment', module)

stories.addDecorator(withKnobs)
stories.add('Attachment', () => 
  <div>
    <Attachment 
      src     = {text('src', 'https://avatars0.githubusercontent.com/u/2084556?s=200&v=4')}
      onClear = {action('onClear')}
    />
  </div>
)

