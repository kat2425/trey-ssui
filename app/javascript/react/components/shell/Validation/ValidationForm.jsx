import React, { Component }         from 'react'
import { observer }                 from 'mobx-react'
import { Radio, Form }              from 'antd'
import styled                       from 'styled-components'
import store                        from 'stores/ValidationStore'
import SubmitButton                 from 'ui/shell/Authentication/Common/SubmitButton'
import DateFormat                   from 'helpers/DateFormat'

const FormItem = Form.Item
const RadioGroup = Radio.Group

@observer
class ValidationForm extends Component {
  handleSubmit = e => {
    const { onSubmit } = store

    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
        this.props.form.resetFields()
      }
    })
  }

  render() {
    const { isSaving, onSelectAddressAnswer, onSelectDateAnswer } = store
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          <QuestionContainer>
            <Question>Which of these addresses corresponds to your kid(s)?</Question>
            {getFieldDecorator('addressId', {
              rules: [
                {
                  required: true,
                  message:  'Please select an address!'
                }
              ]
            })(
              <RadioGroup onChange={onSelectAddressAnswer}>
                {this.props.addressChoices.map((c) =>
                  <Radio key={c.id} style={radioStyle} value={c.id}>{c.answer}</Radio>
                )}
              </RadioGroup>
            )}
          </QuestionContainer>
        </FormItem>
        <FormItem>
          {getFieldDecorator('dateId', {
            rules: [
              {
                required: true,
                message:  'Please select a date of birth!'
              }
            ]
          })(
            <QuestionContainer>
              <Question>Which of these dates of birth corresponds to your kid(s)?</Question>
              <RadioGroup onChange={onSelectDateAnswer}>
                {this.props.dateChoices.map((c) =>
                  <Radio key={c.id} style={radioStyle} value={c.id}>{DateFormat.slashDate(c.answer)}</Radio>
                )}
              </RadioGroup>
            </QuestionContainer>
          )}
        </FormItem>
        <FormItem className='d-flex justify-content-end'>
          <SubmitButton
            size     = 'lg'
            loading  = {isSaving}
            disabled = {false}
            color    = 'primary'
          >
            Submit
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const Question = styled.p`
  color: dimgray;
  font-size: 1.2em;
`

const QuestionContainer = styled.div`
  margin: 15px 0px;
`

const radioStyle = {
  display:    'block',
  height:     '30px',
  lineHeight: '30px'
}

const WrappedValidationForm = Form.create()(ValidationForm)

export default WrappedValidationForm