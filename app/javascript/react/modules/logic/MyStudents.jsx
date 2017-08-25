import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import ModuleHeader        from 'ui/shell/ModuleHeader'
import VJSChart            from 'ui/vjs/VJSChart'
import VJSICSelect         from 'ui/vjs/VJSICSelect'

import fireEvent           from 'helpers/FireEvent'

export default class MyStudents extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ModuleHeader title='My Students'/>

        <div className='row'>
          <VJSChart
            id          = 'my-students-detail'
            reportPath  = '/public/VJS/ss_ui/students/my_students_detail'
            scale       = 'container'
            title       = 'Details'
            className   = 'col-md-7'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', { student: studentID })
                  }
                }
              }
            }}
          />

          <VJSChart
            id         = 'infraction-top-list'
            reportPath = '/public/VJS/ss_ui/infractions/infractions_top_list'
            scale      = 'container'
            title      = 'Stuff'
            className  = 'col-md-5'
            isTable    = {true}
          />
        </div>
      </div>
    )
  }
}
