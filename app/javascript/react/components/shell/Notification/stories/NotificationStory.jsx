import React                         from 'react'
import { storiesOf }                 from '@storybook/react'
import { text, boolean, withKnobs }  from '@storybook/addon-knobs'
import Notification                  from '../Notification.jsx'

const stories = storiesOf('Notification', module)

stories.addDecorator(withKnobs)
stories.add('Notification', () => 
  <div>
    <Notification 
      visible          = {boolean('Visible', true)}
      loading          = {boolean('Loading', true)}
      loadingText      = {text('Loading Text', 'This is the loading text')}
      notificationText = {text('Notification Text', 'This is the notification content')} 
      dismissable      = {boolean('Dismissable', true)}
    />
  </div>
)

