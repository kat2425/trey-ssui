import React           from 'react'
import PropTypes       from 'prop-types'
import { observer }    from 'mobx-react'
import SSButton        from 'ui/shell/SSButton'
import { Popconfirm }  from 'antd'

DeleteButton.propTypes = {
  note: PropTypes.object.isRequired
}

function DeleteButton({note}){
  return (
    <Popconfirm
      title      = 'Are you sure you want to delete this note?'
      onConfirm  = {note.deleteNote}
      okText     = 'Delete'
      cancelText = 'Cancel'
    >
      <SSButton
        className = 'pl-2'
        color     = 'danger'
        loading   = {note.isDeleting}
        iconClass = 'icon icon-trash text-white'
      >
        Delete
      </SSButton>
    </Popconfirm>
  )
}

export default observer(DeleteButton)
