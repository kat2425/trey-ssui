import React                           from 'react'
import { observer }                    from 'mobx-react'
import { Button, Tooltip, Popconfirm } from 'antd'

function DeleteButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null
  return (
    <Popconfirm 
      title      = "Are you sure?"
      onConfirm  = {selectedTag.deleteTag}
      okText     = 'OK'
      cancelText = 'Cancel'
    >
      <Tooltip title='Delete Tag'>
        <Button 
          loading   = {selectedTag.isDeleting}
          icon      = 'delete'
          type      = 'danger'
          ghost
        >              
          Delete
        </Button>
      </Tooltip>
    </Popconfirm>
  )
}

export default observer(DeleteButton)
