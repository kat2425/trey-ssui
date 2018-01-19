import React          from 'react'
import {observer}     from 'mobx-react'
import renderIf       from 'render-if'
import _              from 'lodash'

import LoadingSpinner from 'ui/shell/LoadingSpinner'
import Panel          from 'ui/shell/Panel'
import Title          from './Title'

function NaturalLanguageSection({tagStore}) {
  const { selectedTag } = tagStore
  const {
    renderIfLoading,
    renderIfStudents,
    renderIfNoStudentsAndTested,
    renderIfNoStudentsNotTested
  } = getRenderFunctions(tagStore)

  return (
    <Panel contentStyle={panelStyle}>
      {renderIfLoading(<LoadingSpinner center />)}
      {renderIfStudents(<Title>{selectedTag.pagination.total}</Title>)}
      {renderIfNoStudentsAndTested(<Title>0</Title>)}
      {renderIfNoStudentsNotTested(<p className='my-3 text-muted text-center'>.  .  .</p>)}
      <p className='pb-2'>{selectedTag.humanStringFormat}</p>
    </Panel>
  )
}

const panelStyle = {
  minHeight: 'auto',
  textAlign: 'center'
}
const getRenderFunctions = (tagStore) => {
  const { selectedTag }             = tagStore
  const renderIfLoading             = renderIf(selectedTag.isFetchingStudents)
  const renderIfStudents            = renderIf(selectedTag.hasStudents)
  const renderIfNoStudentsAndTested = renderIf(
    !selectedTag.isFetchingStudents &&
    _.isEmpty(selectedTag.students) && 
    selectedTag.hasBeenTested
  )
  const renderIfNoStudentsNotTested = renderIf(
    !selectedTag.isFetchingStudents &&
    _.isEmpty(selectedTag.students) && 
    !selectedTag.hasBeenTested
  )

  return {
    renderIfLoading,
    renderIfStudents,
    renderIfNoStudentsAndTested,
    renderIfNoStudentsNotTested
  }
}

export default observer(NaturalLanguageSection)

