import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function CreateButton({store}){
  return (
    <SSButton
      onClick   = {store.handleOnCreateClick}
      className = 'pl-2'
      iconClass = 'icon icon-plus'
    >
      New
    </SSButton>
  )
}

export default observer(CreateButton)
