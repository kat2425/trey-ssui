import React, { Component }  from 'react'
import { observer }          from 'mobx-react'
import { Input, Form }       from 'antd'
import SSAlert               from 'ui/shell/SSAlert'
import SubmitButton          from 'ui/shell/Authentication/Common/SubmitButton'
import FormIcon              from 'ui/shell/Authentication/Common/FormIcon'

const FormItem = Form.Item

@observer
class CodeForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { store } = this.props

        store.submitCodes(values)
      }
    })
  }

  onChangeCode = (event) => {
    const { value } = event.target

    return value.replace(/\D/, '')
  }

  renderSuffixIcon = (type) => {
    const { store } = this.props

    if (store.inProgress) {
      return (
        <FormIcon
          type='loading'
        />
      )
    }

    switch (type) {
    case TYPES.EMAIL:
      if (store.emailInvalid) {
        return (
          <FormIcon
            isError
            type='close-circle'
          />
        )
      }
      break

    case TYPES.MOBILE:
      if (store.mobileInvalid) {
        return (
          <FormIcon
            isError
            type='close-circle'
          />
        )
      }
    }
    return null
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
          Enter Verification Codes
        </h3>

        {store.showError && (
          <SSAlert
            message     = {store.errorTitle}
            description = {store.errorMessage}
            type        = 'error'
            className   = 'mb-4'
            onClose     = {() => store.setIsError(false)}
            closable
          />
        )}
        <FormItem extra={`Email code was sent to ${store.email}`}>
          {getFieldDecorator('emailCode', {
            getValueFromEvent: this.onChangeCode,
            validateTrigger:   ['onSubmit'],
            rules:             [
              {
                required: true,
                message:  'Please enter your email verification code'
              }
            ]
          })(
            <Input
              prefix={
                <FormIcon
                  type  = 'mail'
                />
              }
              suffix      = {this.renderSuffixIcon(TYPES.EMAIL)}
              placeholder = 'Enter email verification code...'
              name        = 'email'
              style       = {{ fontSize: 12 }}
            />
          )}
        </FormItem>
        <FormItem extra={`Email code was sent to ${store.phone}`}>
          {getFieldDecorator('mobileCode', {
            getValueFromEvent: this.onChangeCode,
            validateTrigger:   ['onSubmit'],
            rules:             [
              {
                required: true,
                message:  'Please enter your mobile verification code'
              }
            ]
          })(
            <Input
              prefix={
                <FormIcon
                  type  = 'phone'
                />
              }
              suffix      = {this.renderSuffixIcon(TYPES.MOBILE)}
              placeholder = 'Enter mobile verification code...'
              name        = 'mobile'
              style       = {{ fontSize: 12 }}
            />
          )}
        </FormItem>
        <FormItem>
          <SubmitButton
            size      = 'lg'
            loading   = {store.inProgress}
            disabled  = {false}
            color     = 'primary'
            className = 'w-100'
          >
            Submit
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const TYPES = {
  EMAIL:  'EMAIL',
  MOBILE: 'MOBILE'
}

const WrappedCodeForm = Form.create()(CodeForm)

export default observer(WrappedCodeForm)