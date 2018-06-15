import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import SSAlert      from 'ui/shell/SSAlert'

const FailedRoute = () => (
  <SSAlert
    className   = 'text-center'
    type        = 'error'
    message     = {<h4>Email verification error</h4>}
    description = {<Message />}
  />
)

const Message = () => (
  <div>
    <p className='mb-4 h5 font-weight-normal text-body'>
      In order to reset your password, we will need to verify your email first.
      <br />
      Would you like to verify your email?
    </p>
    <SSButton color='primary' className='w-100' onClick={reset} size='lg'>
      Verify Email
    </SSButton>
  </div>
)

function reset() {
  window.location.replace('/reset')
}

export default observer(FailedRoute)
