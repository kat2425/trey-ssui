import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const Assessment = ({student}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Assessment
      </h4>

      <div>
        <VJSChart
          id         = 'sc-act-higher-ed'
          reportPath = '/public/VJS/ss_ui/assessment/act_higher_ed/student_card'
          scale      = 'container'
          title      = 'ACT'
          isTable    = {true}
          params     = {{
            student_id: [ student.id ]
          }}
        />
      </div>
    </div>
  )
}

Assessment.defaultProps = {}

Assessment.propTypes = {}

export default Assessment
