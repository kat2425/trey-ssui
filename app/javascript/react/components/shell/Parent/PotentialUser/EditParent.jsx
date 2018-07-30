import React, { Component }       from 'react'
import { SubmitButton, FormIcon } from 'ui/shell/Authentication/Common'
import { observer }               from 'mobx-react'
import {
  Col,
  Form,
  Input,
  Row
}   from 'antd'

const FormItem    = Form.Item

@observer
class ParentForm extends Component {
  handleSubmit = (e) => {
    const { form, store } = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        store.editParent(values, form.resetFields)
      }
    })
  }

  render() {
    const { store } = this.props
    const { getFieldDecorator } = this.props.form

    if (!store) return null

    return (
      <div className='h-100 w-100'>
        <Form onSubmit={this.handleSubmit} className='h-100 w-100'>
          <Row
            type    = 'flex'
            justify = 'center'
            align   = 'middle'
          >
            <Col span={24}>
              <FormItem>
                {getFieldDecorator('firstName', {
                  rules: [{
                    required: true,
                    message:  'Please input your first name.'
                  }]
                })(
                  <Input 
                    placeholder={'First Name'}
                    prefix={<FormIcon type='user' />}
                    size='large'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('lastName', {
                  rules: [{
                    required: true,
                    message:  'Please input your last name.'
                  }]
                })(
                  <Input 
                    placeholder={'Last Name'}
                    prefix={<FormIcon type='user' />}
                    size='large'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message:  'Please input your email.'
                  },{
                    type:    'email',
                    message: 'Please input a valid email address.'
                  }]
                })(
                  <Input 
                    placeholder={'Email'}
                    type='email'
                    prefix={<FormIcon type='mail' />}
                    size='large'
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    message:  'Please input your phone number.'
                  }]
                })(
                  <Input
                    placeholder={'Phone Number'}
                    prefix={<FormIcon type='phone' />}
                    size='large'
                  />
                )}
              </FormItem>
              <FormItem>
                <SubmitButton 
                  loading={store.isCreating}
                  color='primary'
                  size = 'lg'
                  className='w-100'
                >
                  Update
                </SubmitButton>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ParentForm)
