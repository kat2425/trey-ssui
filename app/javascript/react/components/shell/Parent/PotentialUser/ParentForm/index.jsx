import React, { Component }       from 'react'
import { SubmitButton, FormIcon } from 'ui/shell/Authentication/Common'
import _                          from 'lodash'
import styled                     from 'styled-components'
import { observer }               from 'mobx-react'
import { AsyncTypeahead }         from 'react-bootstrap-typeahead'
import ContactAvatar              from 'ui/shell/ContactAvatar'
import {
  Col,
  Form,
  Input,
  Row,
  List
}   from 'antd'

const ListItem    = List.Item
const FormItem    = Form.Item

@observer
class ParentForm extends Component {
  constructor(props) {
    super(props)

    this.lookupContact = _.debounce(this._lookupContact, 300, {
      leading:  false,
      trailing: true
    })
  }

  handleSubmit = (e) => {
    const { form, store } = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        store.createParent(values, form.resetFields)
      }
    })
  }

  //fix this
  handleListClick = (contact) => {
    const { form } = this.props
    const names = contact.fullName.split(' ')

    form.setFieldsValue({
      firstName: names[0],
      lastName:  names[1],
      email:     contact.email,
      phone:     contact.phone.replace(/\D/g, '')
    })
  }


  renderResults = (item) => (
    <ListItem onClick={() => this.handleListClick(item)} className='w-100'>
      <List.Item.Meta
        avatar={<ContactAvatar id={item.id} />}
        title={<div>{item.name}</div>}
      />
    </ListItem>
  )

  filterByCallback = () => {
    return true
  }

  _lookupContact = (query) => {
    this.props.store.handleContactSearch(query)
  }

  render() {
    const { store } = this.props
    const { getFieldDecorator } = this.props.form

    if (!store) return null

    return (
      <div className='h-100 w-100'>
        <Row
          type      = 'flex'
          justify   = 'center'
          align     = 'middle'
          style     = {{
            padding:         '15px 0',
            backgroundColor: 'rgba(0, 0, 0, 0.09)',
            borderBottom:    '1px solid rgba(0,0,0,0.125)'
          }}
          className = 'w-100 mb-5'
        >
          <Col span={12}>
            <SAsyncTypeahead
              isLoading              = {false}
              maxHeight              = '435px'
              labelKey               = {contact => contact.name}
              filterBy               = {this.filterByCallback}
              options                = {store.orderedContacts}
              onSearch               = {this.lookupContact}
              renderMenuItemChildren = {this.renderResults}
              placeholder            = 'Find a contact...'
              minLength              = {3}
              bsSize                 = 'lg'
            />
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} className='h-100 w-100'>
          <Row
            type    = 'flex'
            justify = 'center'
            align   = 'middle'
          >
            <Col span={12}>
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
                  Create Contact
                </SubmitButton>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const SAsyncTypeahead = styled(AsyncTypeahead)`
  & .dropdown-menu{
    width: 100% !important;
  }
`

export default Form.create()(ParentForm)
