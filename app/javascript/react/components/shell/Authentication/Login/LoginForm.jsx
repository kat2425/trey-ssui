import React                      from 'react'
import { observer }               from 'mobx-react'
import GoogleButton               from './GoogleButton'
import store                      from 'stores/AuthenticationStore'
import SSAlert                    from 'ui/shell/SSAlert'
import { SubmitButton, FormIcon } from '../Common/'
import { 
  Form, 
  Input,
  Divider
} from 'antd'

const FormItem = Form.Item

@observer
class LoginForm extends React.Component {
  componentDidMount() {
    store.checkForFailedGoogleAuth(window.location.search)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.login(values, e, (isSuccess) => {
          if(!isSuccess) return

          window.location.replace(this.props.referer)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}> 
        {store.showError && (
          <SSAlert
            message     = {store.errorTitle}
            description = {store.errorMessage}
            type        = 'error'
            className   = 'mb-4'
            closable
          />
        )}
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message:  'Please enter your email address'
              }
            ]
          })(
            <Input
              prefix      = { <FormIcon type='user' /> }
              placeholder = 'Email'
              name        = 'username'
              size        = 'large'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message:  'Please enter your password'
              }
            ]
          })(
            <Input
              prefix      = { <FormIcon type='lock' /> }
              type        = 'password'
              name        = 'password'
              placeholder = 'Password'
              size        = 'large'
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton
            size      = 'lg'
            color     = 'primary'
            className = 'w-100'
            loading   = {store.isLoggingIn}
          >
            Login
          </SubmitButton>
          <Divider className='my-3'>
            <span style={{color: 'rgba(0, 0, 0, 0.4)'}}>or</span>
          </Divider>
          <GoogleButton 
            type    = 'light'
            onClick = {googleLogin}
            title   = 'Login using your Google Apps for Education account'
          />
        </FormItem>
        <FormItem className='mb-1'>
          <div className='text-center mt-4'>
            <a href='/reset'>
              Forgot password?
            </a>
          </div>
        </FormItem>
      </Form>
    )
  }
}

function googleLogin(){
  window.location.replace('/auth/google_oauth2')
}

const WrappedLoginForm = Form.create()(LoginForm)

export default WrappedLoginForm
