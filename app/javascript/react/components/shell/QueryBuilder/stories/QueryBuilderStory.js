import React         from 'react'
import { storiesOf } from '@storybook/react'
import { action }    from '@storybook/addon-actions'

import Wrapper       from './Wrapper'
import Playground    from './Playground'

import QueryBuilder  from '../'
import schema        from './schema'


const stories = storiesOf('QueryBuilder', module)

stories.add('default', () => {
  return(  
    <Wrapper>
      <QueryBuilder 
        onChange = {action('onChange')}
        onTest   = {action('onTest')}
        onSave   = {action('onSave')}
      />
    </Wrapper>
  )
})

stories.add('with value', () => {
  return(  
    <Wrapper>
      <QueryBuilder 
        schema   = {schema}
        onChange = {action('onChange')}
        onTest   = {action('onTest')}
        onSave   = {action('onSave')}
      />
    </Wrapper>
  ) 
}) 

stories.add('playground', () => {
  return(  
    <Wrapper>
      <Playground schema={schema} />
    </Wrapper>
  ) 
}) 
