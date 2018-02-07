import React                 from 'react'
import { observer }          from 'mobx-react'
import { ModifiedIndicator } from 'ui/shell/SmartTags'

import {
  Button,
  Tooltip
} from 'antd'

function Title({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  return (
    <div className = 'd-flex flex-row align-items-center' >
      <h5 style={nameStyle(selectedTag.isNew)} title={selectedTag.name}>
        <ModifiedIndicator tag={selectedTag}>{selectedTag.name}</ModifiedIndicator>
      </h5>
      {selectedTag.isEditable && (
        <Tooltip title='Edit Tag'>
          <Button
            onClick  = {() => tagStore.editTag(selectedTag)}
            icon     = "edit"
            style    = {{border: 0, background: 'transparent'}}
            disabled = {!selectedTag.modifiable}
          />
        </Tooltip>
      )}
    </div>
  )
}


const nameStyle = (isNew) => {
  if(!isNew) return

  return {
    color:     '#777',
    fontStyle: 'italic'
  }
}

export default observer(Title)
