import React        from 'react'
import { observer } from 'mobx-react'
import { Button }   from 'reactstrap'
import { Tooltip }  from 'antd'

function DeleteButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null
  return (
    <Tooltip title='Delete Tag'>
      <Button
        className = 'pl-2'
        color     = 'danger'
      >
        <span className='icon icon-trash text-white' style={{marginRight: '4px'}}/>
        Delete
      </Button>
    </Tooltip>
  )
}

// FIXME
// Popconfirm surrounding button
//    <Popconfirm
//      title      = "Are you sure?"
//      onConfirm  = {selectedTag.deleteTag}
//      okText     = 'OK'
//      cancelText = 'Cancel'
//    >
//      <Tooltip title='Delete Tag'>
//        <Button
//          className = 'pl-2'
//          color     = 'danger'
//        >
//          <span className='icon icon-trash text-muted' style={{marginRight: '4px'}}/>
//          Delete
//        </Button>
//      </Tooltip>
//    </Popconfirm>

export default observer(DeleteButton)
