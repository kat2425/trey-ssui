import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function SaveButton({note}){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {note.saveNote}
      iconClass = 'icon icon-save'
      loading   = {note.isSaving}
    >
      Save
    </SSButton>
  )
}

export default observer(SaveButton)
