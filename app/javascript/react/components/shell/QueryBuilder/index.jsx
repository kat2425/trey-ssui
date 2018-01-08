import React         from 'react'
import { observer }  from 'mobx-react'

import Query         from './QueryWrapper'
import Builder       from './BuilderWrapper'
import ActionButtons from './ActionButtons'


function QueryBuilder({tag}){ 
  return (
    <div>
      <Query 
        config      = {tag.config}
        value       = {tag.treeQuery}
        onChange    = {tag.setTreeQuery}
        getChildren = {props => <Builder {...props} />}
      />
      <ActionButtons 
        disabled = {false}
        onTest   = {tag.testTag}
        onSave   = {() => tag.handleOnSave(null)}
      />
    </div>
  )
}

export default observer(QueryBuilder)
