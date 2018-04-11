import React        from 'react'
import PropTypes    from 'prop-types'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

EditButton.propTypes = {
  note: PropTypes.object.isRequired
}

function EditButton({note}){
  return (
    <SSButton 
      disabled  = {note.isDeleting}
      onClick   = {note.handleOnEditClick}
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-pencil'
    >
      Edit
    </SSButton>
  )
}

export default observer(EditButton)
