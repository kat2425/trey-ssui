import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const Attendance = ({student}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Attendance
      </h4>

      <div>
        <VJSChart
          id               = 'sc-maap'
          reportPath       = '/public/VJS/ss_ui/attendance/student_card'
          scale            = 'container'
          title            = 'Attendance'
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

Attendance.defaultProps = {}

Attendance.propTypes = {}

export default Attendance
