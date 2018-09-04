import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import SSAlert              from 'ui/shell/SSAlert'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import userStore            from 'stores/UserStore'
import parentStore          from 'stores/ParentHomePageStore'

@observer
class ParentAuthenticator extends Component {
  async componentDidMount() {
    this.routeIfApproved()
  }

  routeIfApproved = async() => {
    const { history } = this.props
    const { id } = userStore.user
    const {
      verified_validations
    } = await parentStore.checkApproval(id)

    if (verified_validations) {
      history.push('/r/students')
    } else {
      history.push('/r/validation')
    }
  }

  render() {
    const { isFetchingUser, userError } = parentStore

    return (
      <div className='d-flex align-items-center justify-content-center h-100'>
        {isFetchingUser && <LoadingSpinner />}
        {userError && 
          <SSAlert
            message='Error'
            description='There was an error retrieving your account from our server!'
            type='error'
          />
        }
      </div>
    )
  }
}

export default ParentAuthenticator