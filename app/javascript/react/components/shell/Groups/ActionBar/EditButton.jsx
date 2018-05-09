import React        from 'react'
import PropTypes    from 'prop-types'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

EditButton.propTypes = {
  group: PropTypes.object.isRequired
}

function EditButton({group}){
  return (
    <SSButton 
      disabled  = {!group.isEditable}
      onClick   = {group.handleOnEditClick}
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-pencil'
    >
      Edit
    </SSButton>
  )
}

export default observer(EditButton)
