import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function CloneButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null

  return (
    <SSButton
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-documents text-muted'
      onClick   = {() => tagStore.cloneTag(selectedTag)}
    >
      Clone List
    </SSButton>
  )
}

export default observer(CloneButton)
