import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'

import NavBar        from '../NavBar'
import ActionBar     from '../ActionBar'

const stories = storiesOf('Toolbars', module)

stories.add('NavBar', () => (
  <NavBar/>
))

stories.add('ActionBar', () => (
  <ActionBar/>
))
