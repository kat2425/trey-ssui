import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { observer }           from 'mobx-react'
import {Form, Input, Button } from 'antd'
import 'antd/lib/button/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'

const FormItem = Form.Item


@observer
class TagForm extends Component {
  static propTypes = {
    tag:      PropTypes.object.isRequired,
    onCancel: PropTypes.func
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleOnFocus = e => {
    e.target.select()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.tag.handleOnSave(values.tagName)
      }
    })
  }

  render() {
    const {
      getFieldDecorator, 
      getFieldsError, 
      getFieldError, 
      isFieldTouched
    } = this.props.form
    const tag = this.props.tag 

    const tagNameError   = isFieldTouched('tagName') && getFieldError('tagName')
    const isError        = !!tagNameError || tag.isError
    const validateStatus = isError ? 'error' : ''
    const help           = isError && (tagNameError || tag.isError.message)

    return (
      <Form onSubmit={this.handleSubmit} style={{minWidth: 250}}>
        <FormItem
          className='mb-1'
          validateStatus = {validateStatus}
          help           = {help || ''}
        >
          {getFieldDecorator('tagName', {
            initialValue: tag.name,
            rules:        [
              {required: true, message: 'Please enter tag name'}
            ]
          })(
            <Input 
              size='large' 
              placeholder="Enter Tag Name" 
              ref={(input) => {input && window.requestAnimationFrame(()=>{input.focus()})}}
              onFocus={this.handleOnFocus}
            />
          )}
        </FormItem>
        <FormItem className='mb-1'>
          <Button 
            type     = "primary"
            htmlType = "submit"
            disabled = {hasErrors(getFieldsError())}
            loading  = {tag.isUpdating}
          >
            Save
          </Button>
          <Button 
            className = 'ml-1'
            onClick   = {this.props.onCancel}
          >
            Cancel
          </Button>
        </FormItem>
      </Form>
    )
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const TagNameForm = Form.create()(TagForm)

export default TagNameForm

