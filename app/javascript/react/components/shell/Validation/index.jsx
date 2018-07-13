import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import Wrapper              from 'ui/shell/Authentication/Common/Wrapper'
import ContentWrapper       from 'ui/shell/Authentication/Common/ContentWrapper'
import { Icon }             from 'antd'
import styled               from 'styled-components'
import ValidationForm       from './ValidationForm'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import validationStore      from 'stores/ValidationStore'
import SSAlert              from 'ui/shell/SSAlert'

@observer
export default class Validation extends Component {
  componentDidMount = () => {
    validationStore.fetchQuestions()
  }

  renderQuestions = (current) => {
    const {
      questions,
      isEmpty,
      isFinished,
    } = validationStore

    if (isEmpty || isFinished) return null

    const values = questions.values()
    const { choices: addressChoices } = values[current].questions.address
    const { choices: dateChoices } = values[current].questions.date_of_birth

    validationStore.setValidationID(values[current].id)

    return (
      <div style={{ width: '100%', flex: 1 }}>
        <ValidationForm addressChoices={addressChoices} dateChoices={dateChoices} />
      </div>
    )
  }

  renderContent = () => {
    const {
      currentQuestion,
      isFetching,
      isFinished,
      isFetchError
    } = validationStore

    if (isFinished) {
      return this.renderFinished()
    }

    if (isFetching) {
      return (
        <div style={{ flex: 1 }} className='d-flex align-items-center justify-content-center'>
          <LoadingSpinner center />
        </div>
      )
    }

    return (
      <div>
        <div style={{ paddingBottom: 8, marginBottom: 10, borderBottom: 'solid thin lightgray' }}>
          <Header>Validation Questions</Header>
          <p>In order to give you access to the correct students, we have to confirm your identity.</p>
        </div>
        {isFetchError
          ? this.renderFetchError()
          : this.renderQuestions(currentQuestion)}
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
    return (
      <div style={{ flex: 1 }} className='d-flex flex-column justify-content-center align-items-center'>
        <Icon
          className='mb-2'
          style={{ fontSize: 42, color: 'seagreen' }}
          type="check-circle"
          color='seagreen'
        />
        <p
          style={{ fontSize: 20, color: 'dimgray' }}
        >
          Submission complete! Your account is now pending approval from the district.
        </p>
      </div>
    )
  }

  render() {
    return (
      <Wrapper noNav>
        <ContentWrapper size='lg'>
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