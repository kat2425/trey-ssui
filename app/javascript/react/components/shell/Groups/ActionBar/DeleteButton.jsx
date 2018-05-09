import React           from 'react'
import PropTypes       from 'prop-types'
import { observer }    from 'mobx-react'
import SSButton        from 'ui/shell/SSButton'
import { Popconfirm }  from 'antd'

DeleteButton.propTypes = {
  group: PropTypes.object.isRequired
}

function DeleteButton({group}){
  return (
    <Popconfirm
      title      = 'Are you sure you want to delete this group?'
      onConfirm  = {group.deleteGroup}
      okText     = 'Delete'
      cancelText = 'Cancel'
    >
      <SSButton
        disabled  = {!group.isEditable}
        className = 'pl-2'
        color     = 'danger'
        loading   = {group.isDeleting}
        iconClass = 'icon icon-trash text-white'
      >
        Delete
      </SSButton>
    </Popconfirm>
  )
}

export default observer(DeleteButton)
