import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import { Tooltip }  from 'antd'

function CreateButton({tagStore}){
  return (
    <Tooltip title='Create A List'>
      <SSButton
        onClick   = {tagStore.handleAddTag}
        className = 'pl-2'
        iconClass = 'icon icon-plus'
      >
        New
      </SSButton>
    </Tooltip>
  )
}

export default observer(CreateButton)
