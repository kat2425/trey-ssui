import React, { Component }                        from 'react'
import { observer }                                from 'mobx-react'
import Wrapper                                     from 'ui/shell/Authentication/Common/Wrapper'
import ContentWrapper                              from 'ui/shell/Authentication/Common/ContentWrapper'
import { Icon, Alert }                             from 'antd'
import styled                                      from 'styled-components'
import ValidationForm                              from './ValidationForm'
import LoadingSpinner                              from 'ui/shell/LoadingSpinner'
import validationStore                             from 'stores/ValidationStore'
import SSAlert                                     from 'ui/shell/SSAlert'
import SSButton                                    from 'ui/shell/SSButton'

@observer
export default class Validation extends Component {
  componentDidMount = () => {
    validationStore.fetchQuestions()
  }

  renderQuestions = () => {
    const {
      currentQuestion,
      isEmpty
    } = validationStore

    if (isEmpty) return null

    const { choices: addressChoices } = currentQuestion.questions.address
    const { choices: dateChoices } = currentQuestion.questions.date_of_birth

    validationStore.setValidationID(currentQuestion.id)

    return (
      <div style={{ width: '100%', flex: 1 }}>
        <ValidationForm addressChoices={addressChoices} dateChoices={dateChoices} />
      </div>
    )
  }

  renderContent = () => {
    const {
      isFetching,
      isFetchError,
      isEmpty
    } = validationStore

    if (isFetching) {
      return (
        <div
          style={{ flex: 1, backgroundColor: 'white' }}
          className='d-flex align-items-center justify-content-center'
        >
          <LoadingSpinner center />
        </div>
      )
    }

    if(isFetchError) {
      return this.renderFetchError()
    }

    if(isEmpty) return null

    return (
      <div>
        <div style={{ paddingBottom: 8, marginBottom: 10, borderBottom: 'solid thin lightgray' }}>
          <Header>Validation Questions</Header>
          <p>In order to give you access to the correct students, we have to confirm your identity.</p>
        </div>
        {this.renderQuestions()}
      </div>
    )
  }

  renderFetchError = () => {
    return (
      <SSAlert
        message='Error'
        description='There was an error retrieving the validation questions! Try again later!'
        type='error'
      />
    )
  }

  renderFinished = () => {
    const { isEmpty, isFetching, hasVerified } = validationStore

    if(!isEmpty || isFetching) return null

    return (
      <div
        style={{ flex: 1 }}
        className='d-flex flex-column justify-content-center align-items-center'
      >
        <Icon
          className='mb-2'
          style={{ fontSize: 42, color: 'seagreen' }}
          type='check-circle'
          color='seagreen'
        />
        <p className='text-center text-muted mt-2' style={{ fontSize: 20 }}>
          Validation(s) submitted! Your account is now pending approval from the district.<br/>
          You will be notified by email upon approval.
        </p>
        { hasVerified && <SSButton href='/r' color='link'>Go to Dashboard</SSButton> }
      </div>
    )
  }

  renderSuccess = () => {
    const { justAttempted, isEmpty } = validationStore

    if(!justAttempted || isEmpty) return null

    const description = [
      'Your submitted validation(s) is now pending approval from the district.',
      'You can answer any remaining questions below.'
    ].join(' ')

    return (
      <Alert
        closable
        onClose={() => validationStore.setJustAttempted(false)}
        className='mb-4'
        message='Validation Submitted!'
        description={description}
        type='success'
        showIcon
      />
    )
  }

  render() {
    return (
      <Wrapper noNav>
        <ContentWrapper size='lg'>
          <SSButton
            className='align-self-end'
            href='/session/logout'
            color='link'
            size={'lg'}
          >
            Log Out
          </SSButton>
          {this.renderFinished()}
          {this.renderSuccess()}
          {this.renderContent()}
        </ContentWrapper>
      </Wrapper>
    )
  }
}

const Header = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.6em;
  margin-bottom: 15px;
`