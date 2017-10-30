import React                  from 'react'
import { storiesOf }          from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'

import renderIf               from 'ui/hoc/renderIf'
import {Button}               from 'reactstrap'

// use renderIf HOC
const EnhancedButton = renderIf(Button)

const stories = storiesOf('renderIf', module)

stories.addDecorator(withKnobs)
stories.add('default', () => 
  <div className='container m-3'>
    <EnhancedButton 
      color='info' 
      renderIf={boolean('renderIf', true)} 
    >
      Hello
    </EnhancedButton>
  </div>
)
stories.add('renderElse', () => 
  <div className='container m-3'>
    <EnhancedButton 
      color='info' 
      renderIf={boolean('renderIf', false)} 
      renderElse={() => <Button color='danger'>Danger</Button>}
    >
      Hello
    </EnhancedButton>
  </div>
)
