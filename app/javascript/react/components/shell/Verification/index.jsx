import React, { Component, Fragment } from 'react'
import { observer }                   from 'mobx-react'
import ContentWrapper                 from 'ui/shell/Authentication/Common/ContentWrapper'
import Wrapper                        from './Wrapper'
import StepIndicator                  from './StepIndicator'
import PasswordForm                   from './PasswordForm'
import CodeForm                       from './CodeForm'
import verificationStore              from 'stores/VerificationStore'
import LoadingSpinner                 from 'ui/shell/LoadingSpinner'
import ExplainerText                  from './ExplainerText'

@observer
export default class Verification extends Component {
  componentDidMount() {
    const id = window.location.pathname.split('/').pop()

    verificationStore.getPotentialUser(id)
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
    const { stepIndex, isFetchingUser, isUserInvalid } = verificationStore

    if (isFetchingUser) {
      return (
        <LoadingSpinner />
      )
    }

    if (isUserInvalid) {
      return (
        <Fragment>
          <ExplainerText>Oops! Looks like you followed an invalid link.</ExplainerText>
          <ExplainerText>
            If you've already submitted your verification codes, you can 
            click <a href='/login'>here</a> to login or reset your password.
          </ExplainerText>
        </Fragment>
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
          <div className='px-4 py-2'>
            <StepIndicator />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ flex: 1 }}>
            {this.showContent()}
          </div>
        </ContentWrapper>
      </Wrapper>
    )
  }
}