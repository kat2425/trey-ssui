import React                    from 'react'
import { observer }             from 'mobx-react'
import store                    from 'stores/ResetPasswordStore'
import {SubmitButton, FormIcon} from '../Common'
import { Form, Input }          from 'antd'
import SSAlert                  from 'ui/shell/SSAlert'

const FormItem = Form.Item

@observer
class NewPasswordForm extends React.Component {
  state = {
    confirmDirty: false
  }

  componentDidMount(){
    store.setUserId(this.props.match.params.userId)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(['password', 'passwordConfirm'], { force: true }, (err, values) => {
      if (!err) {
        store.sendNewPassword(values.password, values.confirm)
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form

    if (value && value !== form.getFieldValue('password')) {
      callback('Password confirmation does not match')
    } else {
      callback()
    }
  }

  validateNextPassword = (rule, value, callback) => {
    const regLowercase = /[a-z]/
    const regUppercase = /[A-Z]/
    const regDigit     = /\d/

    if(value && value.length < 8){
      callback('Password must be at least 8 characters!')
    } else if(!regLowercase.test(value)){
      callback('Password must contain at least one lowercase!')
    } else if(!regUppercase.test(value)){
      callback('Password must contain at least one uppercase!')
    } else if(!regDigit.test(value)){
      callback('Password must contain at least one number!')
    } else {
      callback()
    }
  }

  handleConfirmBlur = e => {
    const value = e.target.value

    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
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
        <FormItem extra='Must be minimum of 8 characters and contain letters and numbers'>
          {getFieldDecorator('password', {
            validateTrigger: ['onSubmit'],
            rules:           [
              {
                required: true,
                message:  'Please enter your desired password'
              },
              {
                validator: this.validateNextPassword
              }
            ]
          })(
            <Input
              prefix      = {<FormIcon type='lock' />}
              type        = 'password'
              name        = 'password'
              placeholder = 'New Password'
              size        = 'large'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwordConfirm', {
            validateTrigger: ['onSubmit'],
            rules:           [
              {
                required: true,
                message:  'Please confirm your password'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix      = {<FormIcon type='lock' />}
              type        = 'password'
              name        = 'confirm'
              placeholder = 'Confirm Password'
              size        = 'large'
              onBlur      = {this.handleConfirmBlur}
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton 
            loading   = {store.isSendingNewPassword}
            size      = 'lg'
            color     = 'primary'
            className = 'w-100'
          >
            Create New Password
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNewPasswordForm = Form.create()(NewPasswordForm)

export default WrappedNewPasswordForm
