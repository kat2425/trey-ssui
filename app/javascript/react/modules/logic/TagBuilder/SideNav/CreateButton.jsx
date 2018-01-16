import React               from 'react'
import { observer }        from 'mobx-react'
import { Button, Tooltip } from 'antd'

function CreateButton({tagStore}){
  return (
    <Tooltip title='Create A Tag'>
      <Button 
        onClick={tagStore.handleAddTag} 
        icon = 'plus'
        type = 'primary'
        ghost
        shape='circle'
      />
    </Tooltip>
  )
}

export default observer(CreateButton)
