import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function EditButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null
  if(selectedTag.isNew) return null

  const notModifiable = (!selectedTag.isNew && !selectedTag.modifiable)
  const isLoading     = selectedTag.isCreating || selectedTag.isUpdating || selectedTag.isDeleting

  return (
    <SSButton
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-pencil'
      disabled  = {notModifiable || isLoading}
      onClick   = {() => tagStore.editTag(selectedTag)}
    >
      Edit
    </SSButton>
  )
}

export default observer(EditButton)
