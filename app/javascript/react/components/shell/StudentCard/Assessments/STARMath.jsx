import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const STARMath = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-star-math'
        reportPath       = '/public/VJS/ss_ui/assessment/renplace/star_math/student_card'
        scale            = 'container'
        title            = 'STAR Math'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

STARMath.defaultProps = {}
STARMath.propTypes = {}

export default STARMath
