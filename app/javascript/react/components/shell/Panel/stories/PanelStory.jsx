import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'

import {
  Button,
  CardTitle,
  CardText,
  Card
} from 'reactstrap'

import Panel         from '../'

const stories = storiesOf('Panel')

stories.add('default', () => {
  return (
    <Panel 
      title  = 'Students'
      footer = {() => 'Footer'}
    >
      <div className='p-2'>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional
          content.
        </CardText>
        <Button>Go somewhere</Button>
      </div>
    </Panel>
  )
})

stories.add('with title on the right', () => {
  return (
    <Panel 
      title      = 'Students'
      footer     = {() => <p>Footer</p>}
      titleRight = {() => <a>right</a>}
    >
      <div className='p-2'>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional
          content.
        </CardText>
        <Button>Go somewhere</Button>
      </div>
    </Panel>
  )
})


const contentStyle = {
  background: 'lightblue',
  minHeight:  200
}

stories.add('change content style', () => {
  return (
    <Panel 
      title      = 'Students'
      footer     = {() => <p>Footer</p>}
      titleRight = {() => <a>right</a>}
      contentStyle = {contentStyle}
    >
      <div className='p-2'>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional
          content.
        </CardText>
        <Button>Go somewhere</Button>
      </div>
    </Panel>
  )
})
