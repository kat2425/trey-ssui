import React                  from 'react'
import { observer }           from 'mobx-react'
// import parentStore, { MODAL } from 'stores/ParentAccessManagementStore'
import SSButton               from 'ui/shell/SSButton'

const InvitedActions = ({validation}) => (
  <div className='d-flex align-items-center'>
    {/* <SSButton
      onClick   = {() => parentStore.setShowModal(MODAL.EDIT)}
      // disabled  = {validation.validationStatus === 'verified'}
      // loading   = {null}
      className = 'mr-4'
      iconClass = 'icon icon-pencil'
      color     = 'primary'
      size      = 'sm'
    >
      Edit
    </SSButton> */}
    <SSButton
      onClick   = {validation.delete}
      // disabled  = {validation.validationStatus === 'deleted'}
      loading   = {validation.isDeleting}
      className = 'mx-auto d-block'
      iconClass = 'icon icon-cross'
      color='danger'
      size='sm'
    >
      Delete
    </SSButton>
  </div>
)

export default observer(InvitedActions)
