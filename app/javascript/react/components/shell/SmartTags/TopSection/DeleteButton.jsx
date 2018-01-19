import React                   from 'react'
import { observer }            from 'mobx-react'
import { Button }              from 'reactstrap'
import { Tooltip, Popconfirm } from 'antd'

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
          className = 'pl-2'
          color     = 'danger'
          disabled  = {selectedTag.isDeleting}
        >
          <span className='icon icon-trash text-white' style={{marginRight: '4px'}}/>
          {selectedTag.isDeleting ? 'Deleting...' : 'Delete' }
        </Button>
      </Tooltip>
    </Popconfirm>
  )
}

export default observer(DeleteButton)
