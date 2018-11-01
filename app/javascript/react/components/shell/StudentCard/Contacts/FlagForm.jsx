import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'
import SSButton             from 'ui/shell/SSButton'
import { Form, Input }      from 'antd'
import styled               from 'styled-components'

const FormItem = styled(Form.Item)`
  & .ant-form-explain{
    margin-top: 5px;
  }
`

@observer
class FormWrapper extends Component {
  static propTypes = {
    contact:  PropTypes.object.isRequired,
    onCancel: PropTypes.func
  }

  componentDidMount() {
    const { form, contact } = this.props

    // To disable submit button at the beginning.
    form.validateFields()
    contact.clearErrors()
  }

  handleOnFocus = e => {
    e.target.select()
  }

  handleSubmit = e => {
    const { form, contact } = this.props

    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        contact.setNote(values.note)
        contact.flagInvalidNumber()
      }
    })
  }

  render() {
    const { form, contact } = this.props
    const {
      getFieldDecorator, 
      getFieldsError, 
      getFieldError, 
      isFieldTouched
    } = form

    const noteError          = isFieldTouched('note') && getFieldError('note')
    const isError            = !!noteError || contact.isError
    const validateStatusName = isError ? 'error' : ''
    const helpName           = isError && (noteError || contact.isError.message)

    return (
      <Form onSubmit={this.handleSubmit} style={{minWidth: 250}}>
        <FormItem
          className      = 'mb-2'
          validateStatus = {validateStatusName}
          help           = {helpName || ''}
        >
          {getFieldDecorator('note', {
            initialValue: '',
            rules:        [{required: true, message: 'A note is required' }]
          })(
            <Input.TextArea
              rows    = {4}
              ref     = {(input) => {input && window.requestAnimationFrame(()=>{input.focus()})}}
              onFocus = {this.handleOnFocus}
            />
          )}
        </FormItem>
        <FormItem className='mb-2 text-right'>
          <SSButton 
            className = 'btn btn-secondary mr-2'
            onClick   = {this.props.onCancel}
          >
            Cancel
          </SSButton>
          <SSButton 
            color    = 'primary'
            disabled = {hasErrors(getFieldsError())}
            loading  = {contact.isFlagging}
          >
            Submit
          </SSButton>
        </FormItem>
      </Form>
    )
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const FlagForm = Form.create()(FormWrapper)

export default FlagForm
