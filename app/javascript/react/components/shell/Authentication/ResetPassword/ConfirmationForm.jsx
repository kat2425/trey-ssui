import React          from 'react'
import { observer }   from 'mobx-react'
import store          from 'stores/ResetPasswordStore'
import {SubmitButton} from '../Common'
import SSAlert        from 'ui/shell/SSAlert'
import { 
  Form, 
  Input
} from 'antd'

const FormItem = Form.Item

@observer
class ConfirmationForm extends React.Component {
  componentDidMount(){
    const { userId, confirmationCode, deliveryMethod } = this.props.match.params

    userId           && store.setUserId(userId)
    confirmationCode && this.autoConfirmCode(confirmationCode)
    deliveryMethod   && store.setDeliveryMethod(deliveryMethod)
  }

  autoConfirmCode = (code) => {
    store.setConfirmationCode(code)
    store.verifyCode(code)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.verifyCode(values.confirmationCode)
      }
    })
  }

  onChangeCode = (event) => {
    const { value } = event.target

    return value.replace(/\D/, '')
  }

  getDeliveryMethod = () => {
    return store.deliveryMethod === 'sms' ? 'phone' : store.deliveryMethod
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
        <p className='h4 mb-4 text-center'>
          Enter the confirmation code to proceed.
        </p>
        <FormItem extra={`Enter the 7 digit code sent to your ${this.getDeliveryMethod()}`}>
          {getFieldDecorator('confirmationCode', {
            getValueFromEvent: this.onChangeCode,
            validateTrigger:   ['onSubmit'],
            rules:             [
              {
                required: true,
                pattern:  /^[0-9]{7}$/,
                message:  'Please enter a 7 digit code'
              }
            ]
          })(
            <Input
              placeholder = 'Confirmation Code'
              className   = 'text-center'
              name        = 'confirmationCode'
              size        = 'large'
              type        = 'number'
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton 
            loading   = {store.isConfirmingCode}
            size      = 'lg'
            color     = 'primary'
            className = 'w-100'
          >
            Continue
          </SubmitButton>
          <SubmitButton 
            loading   = {store.isSendingConfirmationCode}
            color     = 'link'
            className = 'mt-4 w-100'
            onClick   = {() => store.sendDeliveryMethod(store.deliveryMethod)}
          >
            Resend Confirmation Code
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedConfirmationForm = Form.create()(ConfirmationForm)

export default WrappedConfirmationForm
