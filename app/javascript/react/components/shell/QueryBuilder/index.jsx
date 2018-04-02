import React         from 'react'
import { observer }  from 'mobx-react'

import Query         from './QueryWrapper'
import Builder       from './BuilderWrapper'
import ActionButtons from './ActionButtons'


function QueryBuilder({store}){ 
  const { selectedTag } = store

  return (
    <div className='m-0 query-builder'>
      <Query 
        config      = {selectedTag.config}
        value       = {selectedTag.treeQuery}
        onChange    = {selectedTag.setTreeQuery}
        getChildren = {props => <Builder {...props} />}
      />
      <ActionButtons 
        loadingOnTest = {selectedTag.isFetchingStudents}
        loadingOnSave = {selectedTag.isCreating || selectedTag.isUpdating}
        disabled      = {!selectedTag.isValid}
        onTest        = {selectedTag.testTag}
        onSave        = {selectedTag.saveOrEdit}
        modifiable    = {selectedTag.modifiable}
        isModified    = {selectedTag.isModified}
      />
    </div>
  )
}

export default observer(QueryBuilder)
