import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const Grades = ({ student }) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>Grades</h4>

      <VJSChart
        id         = 'sc-student-grades'
        reportPath = '/public/VJS/ss_ui/grades/student_card'
        scale      = 'container'
        title      = 'Grades'
        isTable    = {true}
        params     = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

Grades.defaultProps = {}

Grades.propTypes = {}

export default Grades
