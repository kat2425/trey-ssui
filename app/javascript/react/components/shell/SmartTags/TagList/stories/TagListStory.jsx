import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'
import TagList       from '../'

const stories = storiesOf('TagList')

const store = [
  {
    'id':       '0',
    'name':     'Tag One',
    'query':    {'json': 'goes_here'},
    'isGlobal': true,
    'user':     true,
    'group':    true
  },
  {
    'id':       '1',
    'name':     'Tag Two',
    'query':    {'json': 'goes here as well'},
    'isGlobal': false,
    'user':     true,
    'group':    false
  },
  {
    'id':       '3',
    'name':     'what is this test',
    'query':    {'all': 'test'},
    'isGlobal': false,
    'user':     true,
    'group':    true
  }
]

stories.add('default', () => {
  return <TagList tags={store} onClick={action('Tag Clicked!')} />
})
