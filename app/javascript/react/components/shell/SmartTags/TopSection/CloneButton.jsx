import React               from 'react'
import { observer }        from 'mobx-react'
import { Button, Tooltip } from 'antd'

function CloneButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag || !selectedTag.modifiable) return null

  return (
    <Tooltip title='Clone Tag'>
      <Button 
        icon      = 'copy'
        type      = 'primary'
        ghost
        className = 'mr-2'
        onClick   = {() => tagStore.cloneTag(selectedTag)}
      >              
        Clone 
      </Button>
    </Tooltip>
  )
}

export default observer(CloneButton)
