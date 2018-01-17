import React           from 'react'
import {observer}      from 'mobx-react'
import renderIf        from 'render-if'

import Wrapper         from './Wrapper'
import Title           from './Title'
import CloneButton     from './CloneButton'
import DeleteButton    from './DeleteButton'
import ExportCSVButton from './ExportCSVButton'

function TopSection({tagStore}){
  const { selectedTag }    = tagStore
  const renderIfModifiable = renderIf(selectedTag.modifiable)

  return (
    <Wrapper>
      <Title tagStore={tagStore} />
      <div className='d-flex flex-row align-items-center justify-content-end' >
        <ExportCSVButton tagStore={tagStore} />
        {renderIfModifiable(<CloneButton tagStore={tagStore} />)}
        <DeleteButton tagStore={tagStore} />
      </div>
    </Wrapper>
  )
}

export default observer(TopSection)
