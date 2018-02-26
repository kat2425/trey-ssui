import React          from 'react'
import {observer}     from 'mobx-react'
import _              from 'lodash'
import renderIf       from 'render-if'

import Panel          from 'ui/shell/Panel'
import StudentList    from 'ui/shell/StudentResults/StudentList'
import Result         from './Result'
import {
  NaturalLanguageSection
} from 'ui/shell/SmartTags'

function StudentSection({tagStore}){
  const { selectedTag } = tagStore
  const { renderIfStudents } = getRenderFunctions(tagStore)

  return (
    <Panel
      title        = "Students"
      contentStyle = {{ minHeight: 'auto' }}
      titleRight   = {() => (
        <Result
          results = {selectedTag.pagination.current}
          total   = {selectedTag.pagination.totalPages}
        />
      )}
    >
      <NaturalLanguageSection tagStore={tagStore}/>
      {renderIfStudents(<hr />)}
      {renderIfStudents(<StudentList tag={selectedTag} />)}
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
