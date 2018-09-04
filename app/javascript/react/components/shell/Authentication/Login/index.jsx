import React        from 'react'
import { observer } from 'mobx-react'
import store        from 'stores/AuthenticationStore'
import LoginForm    from './LoginForm'
import FailedAuth   from './FailedAuth'
import { 
  ContentWrapper, 
  Wrapper 
} from '../Common/'

const Login = props => (
  <Wrapper>
    <ContentWrapper>
      {store.showFailedAuth ? <FailedAuth {...props}/> : <LoginForm {...props} />}
    </ContentWrapper>
  </Wrapper>
)

export default observer(Login)
