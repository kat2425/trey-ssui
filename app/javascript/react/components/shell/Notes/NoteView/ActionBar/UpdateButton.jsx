import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

function UpdateButton({note}){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {note.updateNote}
      iconClass = 'icon icon-save'
      loading   = {note.isUpdating}
    >
      Update
    </SSButton>
  )
}

export default observer(UpdateButton)
