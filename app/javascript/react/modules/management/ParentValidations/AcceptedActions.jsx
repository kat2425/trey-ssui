import React                  from 'react'
import { observer }           from 'mobx-react'
import SSButton               from 'ui/shell/SSButton'

const AcceptedActions = ({validation, withLabels = true}) => (
  <div className='d-flex align-items-center'>
    <SSButton
      onClick   = {validation.verify}
      disabled  = {validation.validationStatus === 'verified'}
      loading   = {validation.isVerifying}
      className = 'mr-4'
      iconClass = 'icon icon-check'
      color     = 'success'
      size      = 'sm'
    >
      {withLabels ? 'Approve' : null}
    </SSButton>
    <SSButton
      onClick   = {validation.reject}
      disabled  = {validation.validationStatus === 'rejected'}
      loading   = {validation.isRejecting}
      className = 'mx-auto d-block'
      iconClass = 'icon icon-cross'
      color='danger'
      size='sm'
    >
      {withLabels ? 'Reject' : null}
    </SSButton>
  </div>
)

export default observer(AcceptedActions)
