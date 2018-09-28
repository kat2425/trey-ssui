import React           from 'react'
import { observer }    from 'mobx-react'
import SSButton        from 'ui/shell/SSButton'
import {
  Badge, Popconfirm
}                      from 'antd'
import { MdEventNote } from 'react-icons/lib/md'

const Actions = ({contact, store}) => (
  <div>
    <Badge count={contact.flagsCount} className='mr-2'>
      <SSButton
        disabled = {contact.isUnFlagging}
        onClick  = {() => store.toggleViewNotes(contact)}
        size     = 'sm'
      >
        <MdEventNote size={14}/> View Notes
      </SSButton>
    </Badge>
    <Popconfirm
      title      = 'Are you sure want to unflag this contact?'
      onConfirm  = {contact.unFlagNumber}
      okText     = 'Unflag'
      cancelText = 'Cancel'
    >
      <SSButton
        iconClass = 'icon icon-flag'
        color     = 'danger'
        className = 'ml-3'
        size      = 'sm'
        loading   = {contact.isUnFlagging}
      >
        Unflag
      </SSButton>
    </Popconfirm>
  </div>
)

export default observer(Actions)
