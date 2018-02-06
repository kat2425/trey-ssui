import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const Infractions = ({student}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Infractions
      </h4>

      <div>
        <VJSChart
          id               = 'sc-maap'
          reportPath       = '/public/VJS/ss_ui/infractions/student_card'
          scale            = 'container'
          title            = 'Infractions'
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

Infractions.defaultProps = {}

Infractions.propTypes = {}

export default Infractions
