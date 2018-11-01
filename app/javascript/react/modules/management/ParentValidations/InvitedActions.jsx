import React                  from 'react'
import { observer }           from 'mobx-react'
import SSButton               from 'ui/shell/SSButton'

const InvitedActions = ({potentialUser}) => (
  <div className='d-flex align-items-center'>
    {/* <SSButton
      onClick   = {() => parentStore.setShowModal(MODAL.EDIT)}
      // disabled  = {potentialUser.potentialUserStatus === 'verified'}
      // loading   = {null}
      className = 'mr-4'
      iconClass = 'icon icon-pencil'
      color     = 'primary'
      size      = 'sm'
    >
      Edit
    </SSButton> */}
    <SSButton
      onClick   = {potentialUser.delete}
      loading   = {potentialUser.isDeleting}
      iconClass = 'icon icon-cross'
      color='danger'
      size='sm'
    >
      Delete
    </SSButton>
  </div>
)

export default observer(InvitedActions)
