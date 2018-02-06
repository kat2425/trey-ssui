import React, { Component } from 'react'
import { render }           from 'react-dom'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'
import fireEvent            from 'helpers/FireEvent'
import userStore       from 'stores/UserStore'

export default class Engagement extends Component {
  render() {
    const studentDetailPath = (userStore.user.higherEd) ? '' : '_k12'

    return (
      <div>
        <ModuleHeader title='Engagement'/>

        <div className='row mb-3'>
          <VJSChart
            id         = 'engagement-stats-over-year'
            reportPath = '/public/VJS/ss_ui/channel/engagement_by_date'
            scale      = 'container'
            title      = 'Totals Over Year'
            className  = 'col-md-7'
            fullHeight  = {true}
          />

          <VJSChart
            id         = 'channel-history'
            reportPath = '/public/VJS/ss_ui/channel/contact_hourly_concentration'
            scale      = 'container'
            title      = 'Hourly Contact Concentration'
            className  = 'col-md-5'
            fullHeight  = {true}
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'engagement-user-detail'
            reportPath = '/public/VJS/ss_ui/channel/channel_engagement_user_detail'
            title      = 'User Detail'
            className  = 'col-md-6'
            isTable    = {true}
          />

          <VJSChart
            id         = 'engagement-student-detail'
            reportPath = {`/public/VJS/ss_ui/channel/channel_engagement_student_detail${studentDetailPath}`}
            title      = 'Student Detail'
            className  = 'col-md-6'
            isTable    = {true}
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
        </div>
      </div>
    )
  }
}
