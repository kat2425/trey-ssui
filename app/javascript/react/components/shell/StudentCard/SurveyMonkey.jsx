import React, { Component } from 'react'
import { observer }         from 'mobx-react'

import VJSChart    from 'ui/vjs/VJSChart'
import VJSICSelect from 'ui/vjs/VJSICSelect'

@observer
export default class SurveyMonkey extends Component {
  constructor(props) {
    super(props)

    this.state = { params: {}, selected: {} }
  }

  setSurveyType(val) {
    const jrsValue = val ? val.value : '~NOTHING~'

    this.setState({
      params:   { ...this.state.params, survey_type: [ jrsValue ] },
      selected: { ...this.state.selected, survey_type: val }
    })
  }

  render() {
    return (
      <div>
        <h4 className='m-1 mb-3'>
          Student Surveys
        </h4>

        <VJSChart
          id         = 'sc-student-survey-monkey'
          reportPath = '/public/VJS/ss_ui/survey_monkey/student_card'
          scale      = 'container'
          title      = 'Question/Response'
          isTable    = {true}
          ignorePagination = {true}
          params     = {{
            ...this.state.params,
            student_id: [ this.props.student.id ]
          }}
        >
          <VJSICSelect
            id            = 'survey_type'
            inputPath     = '/public/VJS/ss_ui/survey_monkey/survey_type'
            selectedValue = {this.state.selected.survey_type}
            handleChange  = {::this.setSurveyType}
            placeholder   = 'Survey Type'
            width         = {250}
          />
        </VJSChart>
      </div>
    )
  }
}
