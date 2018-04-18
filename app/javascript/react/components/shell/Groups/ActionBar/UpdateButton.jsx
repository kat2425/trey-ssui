import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function UpdateButton({group}){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {group.updateGroup}
      iconClass = 'icon icon-save'
      loading   = {group.isUpdating}
    >
      Update
    </SSButton>
  )
}

export default observer(UpdateButton)
