import React, { Component} from 'react'

import ModuleHeader        from 'ui/shell/ModuleHeader'
import VJSChart            from 'ui/vjs/VJSChart'
import userStore           from 'stores/UserStore'

import fireEvent           from 'helpers/FireEvent'

export default class MySchools extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const activityPath = (userStore.user.higherEd)
      ? '/public/VJS/ss_ui/channel/recent_activity'
      : '/public/VJS/ss_ui/channel/recent_activity_k12'

    return (
      <div>
        <ModuleHeader title='My Schools'/>

        <div className='row'>
          <VJSChart
            id          = 'my-schools-detail'
            reportPath  = '/public/VJS/ss_ui/dashboard/school_detail'
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
            id          = 'recent-activity'
            reportPath  = {activityPath}
            scale       = 'container'
            title       = 'Recent Engagements'
            className   = 'col-md-5'
            isTable     = {true}
            linkOptions = {{
              events: {
                click: (ev, link) => {
                  const studentID = link.parameters._student_id

                  if (studentID) {
                    fireEvent('showStudentCard', {
                      student: studentID,
                      path:    'engagement'
                    })
                  }
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}
