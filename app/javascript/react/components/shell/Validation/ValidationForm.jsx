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
        onSubmit(values, () => {
          this.props.form.resetFields()
        })
      }
    })
  }

  renderSkipButton = () => {
    const { isSkipping, isSubmitting } = store

    return (
      <SubmitButton
        onClick   = {store.onSkip}
        className = 'mr-4'
        size      = 'lg'
        loading   = {isSkipping}
        disabled  = {isSubmitting}
        color     = 'secondary'
      >
        Skip Validation
      </SubmitButton>
    )
  }

  renderCounter = () => (
    <p className='text-right font-weight-bold'>{store.orderedValidations.length} validations remaining</p>
  )

  render() {
    const { isSaving, isSubmitting, onSelectAddressAnswer, onSelectDateAnswer } = store
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderCounter()}
        <FormItem className='mb-0'>
          <QuestionContainer>
            <Question>Which of these addresses corresponds to your student(s)?</Question>
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
              <Question>Which of these dates of birth corresponds to your student(s)?</Question>
              <RadioGroup onChange={onSelectDateAnswer}>
                {this.props.dateChoices.map((c) =>
                  <Radio key={c.id} style={radioStyle} value={c.id}>{DateFormat.longDate(c.answer)}</Radio>
                )}
              </RadioGroup>
            </QuestionContainer>
          )}
        </FormItem>
        <FormItem className='d-flex justify-content-start'>
          {this.renderSkipButton()}
          <SubmitButton
            size     = 'lg'
            loading  = {isSaving}
            disabled = {isSubmitting}
            color    = 'primary'
          >
            Submit Validation
          </SubmitButton>
        </FormItem>
      </Form>
    )
  }
}

const Question = styled.p`
  color: dimgray;
  font-size: 1.2em;
  margin-bottom: 0;
`

const QuestionContainer = styled.div`
  margin: 5px 0px;
`

const radioStyle = {
  display:    'block',
  height:     '30px',
  lineHeight: '30px'
}

const WrappedValidationForm = Form.create()(ValidationForm)

export default WrappedValidationForm