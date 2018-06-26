import React, { Component }  from 'react'
import { observer }          from 'mobx-react'
import { Input, Form }       from 'antd'
import SubmitButton          from 'ui/shell/Authentication/Common/SubmitButton'
import SSAlert               from 'ui/shell/SSAlert'
import FormIcon              from 'ui/shell/Authentication/Common/FormIcon'

const FormItem = Form.Item

@observer
class PasswordForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields(['password', 'passwordConfirm'], { force: true }, (err, values) => {
      if (!err) {
        const { store } = this.props

        store.submitPassword(values.password)
      }
    })
  }

  validatePassword = (rule, value, callback) => {
    const regDigit = /\d/
    const regLowercase = /[a-z]/
    const regUppercase = /[A-Z]/

    if (value && value.length < 8) {
      callback('Password must be at least 8 characters!')
    } else if(!regDigit.test(value)) {
      callback('Password must contain at least one number!')
    } else if(!regLowercase.test(value)) {
      callback('Password must contain at least one lowercase letter!')
    } else if(!regUppercase.test(value)) {
      callback('Password must contain at least one uppercase letter!')
    } else {
      callback()
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props

    if (value && value !== form.getFieldValue('password')) {
      callback('Password confirmation does not match')
    } else {
      callback()
    }
  }

  renderSuffixIcon = () => {
    const { store } = this.props

    if (store.inProgress) {
      return (
        <FormIcon
          type='loading'
        />
      )
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { store } = this.props

    return (
      <Form className='mb-4' onSubmit={this.handleSubmit}>
        <h3 
          className='mb-4 text-center' 
          style={{ 
            color:      'dimgray', 
            fontWeight: 'bold' 
          }}
        >
          Create Your Password
        </h3>
        {store.showError && (
          <SSAlert
            message={store.errorTitle}
            description={store.errorMessage}
            type='error'
            className='mb-4'
            onClose={() => store.setIsError(null)}
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
                validator: this.validatePassword,
              }
            ]
          })(
            <Input
              prefix={
                <FormIcon
                  type='lock'
                />
              }
              type='password'
              suffix={this.renderSuffixIcon()}
              placeholder='Create a password...'
              name='password'
              style={{ fontSize: 12 }}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwordConfirm', {
            validateTrigger: ['onSubmit'],
            rules:           [
              {
                required: true,
                message:  'Please enter your desired password'
              }, {
                validator: this.compareToFirstPassword,
              }
            ]
          })(
            <Input
              prefix={
                <FormIcon
                  type='lock'
                />
              }
              type='password'
              suffix={this.renderSuffixIcon()}
              placeholder='Confirm your password...'
              name='passwordConfirm'
              style={{ fontSize: 12 }}
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton
            size='lg'
            loading={store.inProgress}
            disabled={false}
            color='primary'
            className='w-100'
          >
            Submit
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedPasswordForm = Form.create()(PasswordForm)

export default WrappedPasswordForm