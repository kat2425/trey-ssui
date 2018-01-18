import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const CourseAttendance = ({ student }) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>Attendance</h4>

      <VJSChart
        id         = 'sc-student-course-absences'
        reportPath = '/public/VJS/ss_ui/attendance/course_student_card'
        scale      = 'container'
        title      = 'Courses Missed'
        isTable    = {true}
        params     = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

CourseAttendance.defaultProps = {}

CourseAttendance.propTypes = {}

export default CourseAttendance
