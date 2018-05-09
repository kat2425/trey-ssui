import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function SaveButton({group}){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {group.saveGroup}
      iconClass = 'icon icon-save'
      loading   = {group.isSaving}
    >
      Save
    </SSButton>
  )
}

export default observer(SaveButton)
