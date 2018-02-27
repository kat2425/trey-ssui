import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const Attendance = ({student}) => {
  const emptyMessage = `
  This student has perfect attendance!  Reach out to one of their contacts to say,
  "Way to go!"
  `

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
          emptyIcon        = {'emoji-happy'}
          emptyTitle       = 'Hooray!'
          emptyMessage     = {emptyMessage}
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

export default observer(Attendance)
