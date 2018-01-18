import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const SurveyMonkey = ({ student }) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Student Surveys
        <div className='pull-right'>
          foo
        </div>
      </h4>

      <VJSChart
        id         = 'sc-student-survey-monkey'
        reportPath = '/public/VJS/ss_ui/survey_monkey/student_card'
        scale      = 'container'
        title      = 'Question/Response'
        isTable    = {true}
        ignorePagination = {true}
        params     = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

SurveyMonkey.defaultProps = {}

SurveyMonkey.propTypes = {}

export default SurveyMonkey
