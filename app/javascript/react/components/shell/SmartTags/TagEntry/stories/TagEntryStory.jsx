import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'
import TagEntry      from '../'

const stories = storiesOf('TagEntry', module) // eslint-disable-line

const tag = {
  'id':       '0',
  'name':     'Tag One',
  'query':    {'json': 'goes_here'},
  'isGlobal': true,
  'user':     true,
  'group':    true
}

stories.add('default', () => {
  return <TagEntry tag={tag} onClick={action('tag Clicked!')} />
})
