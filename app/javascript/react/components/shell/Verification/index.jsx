import React, { Component }           from 'react'
import { observer }                   from 'mobx-react'
import { ContentWrapper, Wrapper }    from 'ui/shell/Authentication/Common'
import StepIndicator                  from './StepIndicator'
import PasswordForm                   from './PasswordForm'
import CodeForm                       from './CodeForm'
import verificationStore              from 'stores/VerificationStore'
import LoadingSpinner                 from 'ui/shell/LoadingSpinner'

@observer
export default class Verification extends Component {
  componentDidMount() {
    verificationStore.getPotentialUser(this.props.match.params.id, () =>
      this.props.history.push('/verification')
    )
  }

  showVerification = () => {
    const { submitCode, isSaving } = verificationStore

    return (
      <div className='d-flex align-items-center justify-content-center' style={{ flex: 1 }}>
        <CodeForm
          store={verificationStore}
          onSubmit={submitCode}
          inProgress={isSaving}
        />
      </div>
    )
  }

  showLogin = () => {
    const { redirectSeconds, startRedirectTimer } = verificationStore

    startRedirectTimer(() => {
      window.location.replace('/login')
    })

    return (
      <div className='text-center' style={{ fontSize: 16 }}>
        <p>Great! You can now log in to SchoolStatus!</p>
        <p>{`You will be redirected to our login page in ${redirectSeconds} seconds.`}</p>
        <div className='mt-4'>
          <a href='/login'>Click here if you are not redirected.</a>
        </div>
      </div>
    )
  }

  showContent = () => {
    const { stepIndex, isFetchingUser } = verificationStore

    if (isFetchingUser) {
      return (
        <LoadingSpinner />
      )
    }

    switch (stepIndex) {
    case 0:
      return this.showVerification()
    case 1:
      return <PasswordForm store={verificationStore} onSubmit={verificationStore.onSubmitPassword} />
    case 2:
      return this.showLogin()
    }
  }

  render() {
    return (
      <Wrapper>
        <ContentWrapper size='lg'>
          {!verificationStore.isFetchingUser && (
            <div className='px-4 py-2'>
              <StepIndicator />
            </div>
          )}
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ flex: 1 }}>
            {this.showContent()}
          </div>
        </ContentWrapper>
      </Wrapper>
    )
  }
}