import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const Courses = ({ student }) => {
  return (
    <VJSChart
      id         = 'sc-student-courses'
      reportPath = '/public/VJS/ss_ui/courses/student_card'
      scale      = 'container'
      title      = 'Schedule'
      isTable    = {true}
      ignorePagination = {true}
      params     = {{
        student_id: [ student.id ]
      }}
    />
  )
}

Courses.defaultProps = {}

Courses.propTypes = {}

export default Courses
