import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import { Tooltip }  from 'antd'
import userStore    from 'stores/UserStore'

function CreateButton({groupStore}){
  return (
    <Tooltip title='Create A List'>
      <SSButton
        disabled  = {!userStore.canCreateGroup}
        onClick   = {groupStore.handleAddGroup}
        className = 'pl-2'
        iconClass = 'icon icon-plus'
      >
        New
      </SSButton>
    </Tooltip>
  )
}

export default observer(CreateButton)
