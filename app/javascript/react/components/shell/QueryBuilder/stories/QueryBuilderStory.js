import React          from 'react'
import { storiesOf }  from '@storybook/react'

import Wrapper        from './Wrapper'
import Playground     from './Playground'

import QueryBuilder   from '../'
import Tag            from 'stores/models/Tag'


const stories = storiesOf('QueryBuilder', module)

stories.add('default', () => {
  const tag = new Tag()

  return (  
    <Wrapper>
      <QueryBuilder tag={tag} />
    </Wrapper>
  )
})

stories.add('playground', () => {
  const tag = new Tag()

  return (  
    <Wrapper>
      <Playground tag={tag}/>
    </Wrapper>
  ) 
}) 
