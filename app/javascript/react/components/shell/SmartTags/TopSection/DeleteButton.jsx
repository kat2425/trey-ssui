import React          from 'react'
import { observer }   from 'mobx-react'
import { Popconfirm } from 'antd'
import SSButton       from 'ui/shell/SSButton'

function DeleteButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null
  return (
    <Popconfirm
      title      = {`Are you sure you want to delete ${selectedTag.name} ?`}
      onConfirm  = {selectedTag.deleteTag}
      okText     = 'Delete'
      cancelText = 'Cancel'
    >
      <SSButton
        className = 'pl-2'
        iconClass = 'icon icon-trash'
        color     = 'danger'
        loading   = {selectedTag.isDeleting}
        disabled  = {!selectedTag.isNew && !selectedTag.modifiable}
      >
        Delete
      </SSButton>
    </Popconfirm>
  )
}

export default observer(DeleteButton)
