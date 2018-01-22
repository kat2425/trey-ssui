import React         from 'react'
import { observer }  from 'mobx-react'

import Query         from './QueryWrapper'
import Builder       from './BuilderWrapper'
import ActionButtons from './ActionButtons'


function QueryBuilder({tag}){ 
  return (
    <div className='p-4 query-builder'>
      <Query 
        config      = {tag.config}
        value       = {tag.treeQuery}
        onChange    = {tag.setTreeQuery}
        getChildren = {props => <Builder {...props} />}
      />
      <ActionButtons 
        loadingOnTest = {tag.isFetchingStudents}
        loadingOnSave = {tag.isCreating || tag.isUpdating}
        disabled      = {!tag.isValid}
        onTest        = {tag.testTag}
        onSave        = {tag.handleOnSave}
      />
    </div>
  )
}

export default observer(QueryBuilder)
