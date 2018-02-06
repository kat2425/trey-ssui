import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const MAAP = ({student}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        MAAP
      </h4>

      <div>
        <VJSChart
          id               = 'sc-maap'
          reportPath       = '/public/VJS/ss_ui/assessment/maap/student_card'
          scale            = 'container'
          title            = 'MAAP'
          isTable          = {true}
          ignorePagination = {true}
          params           = {{
            student_id: [ student.id ]
          }}
        />
      </div>
    </div>
  )
}

MAAP.defaultProps = {}

MAAP.propTypes = {}

export default MAAP

