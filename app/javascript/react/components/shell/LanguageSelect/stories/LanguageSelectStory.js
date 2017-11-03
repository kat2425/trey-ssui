import React               from 'react'
import { storiesOf }       from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import { action }          from '@storybook/addon-actions'
import LanguageSelect      from '..'

const stories = storiesOf('LanguageSelect', module) // eslint-disable-line

stories.addDecorator(withKnobs)
stories.add('default', () => 
  <div className='m-2'>
    <LanguageSelect 
      color       = {text('color', 'grey')}
      placeholder = {text('placeholder', 'Select language')}
      onChange    = {action('onChange')}
    />
  </div>
)

