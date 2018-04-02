import React        from 'react'
import { observer } from 'mobx-react'
import { Button }   from 'reactstrap'

function EditButton({tagStore}){
  const { selectedTag } = tagStore

  if(!selectedTag) return null
  if(selectedTag.isNew) return null

  const notModifiable = (!selectedTag.isNew && !selectedTag.modifiable)
  const isLoading     = selectedTag.isCreating || selectedTag.isUpdating || selectedTag.isDeleting

  return (
    <Button
      className = 'pl-2 mr-2'
      disabled  = {isLoading || notModifiable}
      onClick   = {() => tagStore.editTag(selectedTag)}
    >
      <span className='icon icon-pencil text-muted' style={{marginRight: '4px'}}/>
      Edit
    </Button>
  )
}

export default observer(EditButton)
