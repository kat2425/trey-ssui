import React        from 'react'
import { observer } from 'mobx-react'
import { Button }   from 'reactstrap'
import { Tooltip }  from 'antd'

function CreateButton({tagStore}){
  return (
    <Tooltip title='Create A Tag'>
      <Button
        onClick   = {tagStore.handleAddTag}
        className = 'pl-2'
      >
        <span className='icon icon-plus' style={{marginRight: '4px'}}/>
        New
      </Button>
    </Tooltip>
  )
}

export default observer(CreateButton)
