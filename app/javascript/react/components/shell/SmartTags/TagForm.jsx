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

import {GroupSelect} from 'ui/shell/SmartTags'

@observer
class FormWrapper extends Component {
  static propTypes = {
    tag:      PropTypes.object.isRequired,
    onCancel: PropTypes.func
  }

  constructor(props){
    super(props)

    const { tag } = this.props

    this.state = {
      showSelectGroup: tag.isGroup,
      selectedGroups:  tag.groupIds.join(',')
    }
  }

  componentDidMount() {
    const { form, tag } = this.props

    // To disable submit button at the beginning.
    form.validateFields()
    tag.clearErrors()
  }

  handleOnFocus = e => {
    e.target.select()
  }

  handleSubmit = e => {
    const { form, tag, store } = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        tag.updateTag({...values, groupIds: this.state.selectedGroups})
        store.toggleQueryForm()
      }
    })
  }

  handleOnGroupChange = (groups) => {
    this.setState({selectedGroups: groups.join(',')})
  }

  handleOnSelectScopeChange = (value) => {
    if(value !== 'group'){
      this.setState({
        showSelectGroup: false,
        selectedGroups:  ''
      })
    } else {
      this.setState({showSelectGroup: true})
    }
  }

  render() {
    const { form, tag } = this.props
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
        >
          {getFieldDecorator('scope', {
            initialValue: getScopeValue(tag),
            rules:        [
              {required: true, message: 'Please select the scope of this tag'}
            ]
          })(
            <Select onChange={this.handleOnSelectScopeChange}>
              <Option value='private'>Just Me</Option>
              <Option value='global'>Everyone</Option>
              <Option value='group'>Select Group</Option>
            </Select>
          )}
        </FormItem>
        { this.state.showSelectGroup && (
          <FormItem className='mb-2'>
            <GroupSelect tag={tag} onChange={this.handleOnGroupChange} />
          </FormItem>
        )}
        <FormItem
          className      = 'mb-2'
          validateStatus = {validateStatusName}
          help           = {helpName || ''}
        >
          {getFieldDecorator('name', {
            initialValue: tag.name || '',
            rules:        [
              {required: true, message: 'Please enter tag name'}
            ]
          })(
            <Input 
              placeholder="Enter List Name" 
              ref={(input) => {input && window.requestAnimationFrame(()=>{input.focus()})}}
              onFocus={this.handleOnFocus}
            />
          )}
        </FormItem>
        <FormItem 
          tail 
          className='mb-2 text-center'
        >
          <Button 
            type     = 'primary'
            htmlType = 'submit'
            disabled = {hasErrors(getFieldsError())}
          >
            Update
          </Button>
          <Button 
            className = 'ml-2'
            onClick   = {this.props.onCancel}
          >
            Cancel
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const FormItem = ({tail, ...props}) => tail 
  ? <Form.Item {...props} /> 
  : <Form.Item {...props} />

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
const TagForm = Form.create()(FormWrapper)

export default TagForm

