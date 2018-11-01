import React                      from 'react'
import { observer }               from 'mobx-react'
import store                      from 'stores/ResetPasswordStore'
import { SubmitButton, FormIcon } from '../Common'
import { Form, Input }            from 'antd'
import SSAlert                    from 'ui/shell/SSAlert'

const FormItem = Form.Item

@observer
class UsernameVerificationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.verifyUsername(values.username)
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
        <p className='h4 mb-4 text-center'>Please enter your email address</p>
        <FormItem>
          {getFieldDecorator('username', {
            validateTrigger: ['onSubmit'],
            rules:           [
              {
                type:    'email',
                message: 'Please enter a valid email address'
              },
              {
                required: true,
                message:  'Please enter your email address'
              }
            ]
          })(
            <Input
              prefix      = {<FormIcon type='user' />}
              placeholder = 'Email'
              name        = 'email'
              size        = 'large'
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton
            loading   = {store.isVerifyingUsername}
            size      = 'lg'
            color     = 'primary'
            className = 'w-100'
          >
            Reset Password
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedUsernameVerificationForm = Form.create()(UsernameVerificationForm)

export default WrappedUsernameVerificationForm
