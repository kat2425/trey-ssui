import React                    from 'react'
import { observer }             from 'mobx-react'
import styled                   from 'styled-components'
import store                    from 'stores/ResetPasswordStore'

import UsernameVerificationForm from './UsernameVerificationForm'
import NewPasswordForm          from './NewPasswordForm'
import ConfirmationForm         from './ConfirmationForm'
import DeliveryForm             from './DeliveryForm'
import StepsIndicator           from './StepsIndicator'
import FailedRoute              from './FailedRoute'

import { 
  Wrapper, 
  ContentWrapper 
} from '../Common/'

import { 
  Switch, 
  Route
} from 'react-router'

class ResetPassword extends React.Component{
  constructor(props) {
    super(props)
    store.setHistory(props.history)
  }

  render(){
    return (
      <Wrapper>
        <ContentWrapper size='lg'>
          <StepsIndicator {...this.props} />
          <Content>
            <Switch>
              <Route
                exact
                path      = '/reset'
                component = {UsernameVerificationForm}
              />
              <Route
                path      = '/reset/delivery_method/:userId'
                component = {DeliveryForm}
              />
              <Route
                path      = '/reset/confirmation_code/:userId/:confirmationCode?/:deliveryMethod?'
                component = {ConfirmationForm}
              />
              <Route
                path      = '/reset/new_password/:userId'
                component = {NewPasswordForm}
              />
              <Route component={FailedRoute} />
            </Switch>
          </Content>
        </ContentWrapper>
      </Wrapper>
    )
  }
}

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export default observer(ResetPassword)
