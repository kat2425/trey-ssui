import React, { Component } from 'react'
import { render }           from 'react-dom'

import ModuleHeader         from 'ui/components/shell/ModuleHeader'
import VJSContainer         from 'ui/components/vjs/VJSContainer'
import VJSChart             from 'ui/components/vjs/VJSChart'

export default class Engagement extends Component {
  render() {
    return (
      <VJSContainer>
        <ModuleHeader title='Engagement'/>

        <div className='row'>
          <VJSChart
            id         = 'engagement-stats-over-year'
            reportPath = '/public/VJS/ss_ui/channel/engagement_by_date'
            scale      = 'container'
            title      = 'Totals Over Year'
            className  = 'col-md-7'
          />

          <VJSChart
            id         = 'channel-history'
            reportPath = '/public/VJS/ss_ui/channel/contact_hourly_concentration'
            scale      = 'container'
            title      = 'Hourly Contact Concentration'
            className  = 'col-md-5'
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
            reportPath = '/public/VJS/ss_ui/channel/channel_engagement_student_detail'
            title      = 'Student Detail'
            className  = 'col-md-6'
            isTable    = {true}
          />
        </div>
      </VJSContainer>
    )
  }
}
