import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { observer }           from 'mobx-react'

import {
  Form, 
  Input, 
  Button,
  Select
} from 'antd'
const Option = Select.Option

@observer
class TagForm extends Component {
  static propTypes = {
    tag:      PropTypes.object.isRequired,
    onCancel: PropTypes.func
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
    this.props.tag.clearErrors()
  }

  handleOnFocus = e => {
    e.target.select()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.tag.handleOnSave({...values})
      }
    })
  }

  render() {
    const { tag, form } = this.props
    const {
      getFieldDecorator, 
      getFieldsError, 
      getFieldError, 
      isFieldTouched
    } = form

    const nameError          = isFieldTouched('name') && getFieldError('name')
    const isError            = !!nameError || tag.isError
    const validateStatusName = isError ? 'error' : ''
    const helpName           = isError && (nameError || tag.isError.message)

    return (
      <Form onSubmit={this.handleSubmit} style={{minWidth: 250}}>
        <FormItem
          className      = 'mb-1'
          label          = 'Scope'
        >
          {getFieldDecorator('scope', {
            initialValue: getScopeValue(tag),
            rules:        [
              {required: true, message: 'Please select the scope of this tag'}
            ]
          })(
            <Select size='large'>
              <Option value='private'>Just Me</Option>
              <Option value='global'>Everyone</Option>
              <Option value='group' disabled>Select Group</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          className      = 'mb-1'
          validateStatus = {validateStatusName}
          help           = {helpName || ''}
          label          = 'Tag Name'
        >
          {getFieldDecorator('name', {
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
        <FormItem 
          tail 
          className='mb-1'
        >
          <Button 
            size     = 'large'
            type     = 'primary'
            htmlType = 'submit'
            disabled = {hasErrors(getFieldsError())}
            loading  = {tag.isUpdating}
          >
            Save
          </Button>
          <Button 
            size     = 'large'
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span:   24,
      offset: 0,
    },
    sm: {
      span:   16,
      offset: 8,
    },
  },
}
const FormItem = ({tail, ...props}) => tail 
  ? <Form.Item {...props} {...tailFormItemLayout}/> 
  : <Form.Item {...props} {...formItemLayout}/>

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function getScopeValue(tag){
  if(tag.isGlobal){
    return 'global'
  } else if(tag.isGroup){
    return 'group'
  } else if(tag.isPrivate) {
    return 'private'
  } else {
    return null
  }
}
const TagNameForm = Form.create()(TagForm)

export default TagNameForm

