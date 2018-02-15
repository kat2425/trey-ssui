import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const STARReading = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-star-reading'
        reportPath       = '/public/VJS/ss_ui/assessment/renplace/star_reading/student_card'
        scale            = 'container'
        title            = 'STAR Reading'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

STARReading.defaultProps = {}
STARReading.propTypes = {}

export default STARReading
