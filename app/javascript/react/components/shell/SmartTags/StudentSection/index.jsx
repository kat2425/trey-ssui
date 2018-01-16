import React          from 'react'
import {observer}     from 'mobx-react'
import _              from 'lodash'
import renderIf       from 'render-if'

import LoadingSpinner from 'ui/shell/LoadingSpinner'
import Panel          from 'ui/shell/Panel'
import StudentList    from 'ui/shell/StudentResults/StudentList'
import Result         from './Result'

function StudentSection({tagStore}){
  const { selectedTag } = tagStore
  const { 
    renderIfLoading, 
    renderIfStudents, 
    renderIfNoStudents 
  } = getRenderFunctions(tagStore)

  return (
    <Panel
      className="pt-4"
      title="Students"
      contentStyle={{ minHeight: 'auto' }}
      titleRight={() => (
        <Result
          results = {selectedTag.students.length}
          total   = {selectedTag.pagination.total}
        />
      )}
    >
      {renderIfLoading(<LoadingSpinner center />)}
      {renderIfStudents(<StudentList tag={selectedTag} />)}
      {renderIfNoStudents(<p className='my-5 text-muted text-center'>No Students</p>)}
    </Panel>
  )
}

const getRenderFunctions = (tagStore) => {
  const { selectedTag }    = tagStore
  const renderIfLoading    = renderIf(selectedTag.isFetchingStudents && _.isEmpty(selectedTag.students))
  const renderIfNoStudents = renderIf(!selectedTag.isFetchingStudents && _.isEmpty(selectedTag.students))
  const renderIfStudents   = renderIf(!_.isEmpty(selectedTag.students))

  return {
    renderIfLoading,
    renderIfStudents,
    renderIfNoStudents
  }
}

export default observer(StudentSection)
