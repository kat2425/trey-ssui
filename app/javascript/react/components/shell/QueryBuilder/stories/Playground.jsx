import React        from 'react'

import QueryView    from './QueryView'
import QueryBuilder from '../'
import {observer}   from 'mobx-react'

function Playground({tag}){
  return (
    <div> 
      <QueryBuilder tag={tag} />
      <QueryView tag={tag} />
    </div>
  )
}

export default observer(Playground)
