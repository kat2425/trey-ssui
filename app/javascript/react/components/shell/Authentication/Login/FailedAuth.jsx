import React        from 'react'
import { observer } from 'mobx-react'
import store        from 'stores/AuthenticationStore'
import SSButton     from 'ui/shell/SSButton'

const FailedAuth = () => (
  <div>
    <p className="text-center h5 mb-4">
      It looks like you're having trouble logging in.<br />
      Would you like to reset your password?
    </p>
    <div className="d-flex justify-content-between">
      <SSButton color="link" onClick={tryAgain}>
        No, I'll try again
      </SSButton>
      <SSButton color="link" onClick={reset}>
        Yes, let's reset
      </SSButton>
    </div>
  </div>
)

function tryAgain() {
  store.clearFailureAuthCount()
  store.setIsError(false)
}

function reset() {
  window.location.replace('/reset')
}

export default observer(FailedAuth)
