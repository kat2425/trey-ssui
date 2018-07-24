import React          from 'react'
import { observer }   from 'mobx-react'
import {SubmitButton} from '../Common'
import store          from 'stores/ResetPasswordStore'
import SSAlert        from 'ui/shell/SSAlert'
import { 
  Form, 
  Radio
} from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

@observer
class DeliveryForm extends React.Component {
  componentDidMount(){
    store.setUserId(this.props.match.params.userId)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.sendDeliveryMethod(values.delivery)
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
        <p className='mb-4 h4 text-center'>
          Select a delivery method for your temporary password
        </p>
        <FormItem className='text-center mb-2'>
          {getFieldDecorator('delivery', {
            initialValue: 'email',
            rules:        [{
              required: true,
              message:  'Please select a delivery method'
            }]
          })(
            <RadioGroup onChange={this.handleOnChange}>
              <Radio value="email">E-mail</Radio>
              <Radio value="sms">Text Message</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem>
          <SubmitButton 
            loading   = {store.isSendingConfirmationCode}
            size      = 'lg'
            color     = 'primary'
            className = 'w-100'
          >
            Send Temporary Password
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedDeliveryForm = Form.create()(DeliveryForm)

export default WrappedDeliveryForm
