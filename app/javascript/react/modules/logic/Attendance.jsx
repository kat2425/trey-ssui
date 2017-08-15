import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSContainer         from 'ui/vjs/VJSContainer'
import VJSChart             from 'ui/vjs/VJSChart'

export default class Attendance extends Component {
  render() {
    return (
      <VJSContainer>
        <ModuleHeader title='Attendance'/>

        <VJSChart
          id         = 'ada-over-year'
          reportPath = '/public/VJS/ss_ui/attendance/ada_over_year'
          scale      = 'container'
          title      = 'Average Over Year'
        />

        <VJSChart
          id         = 'weekly-heatmap'
          reportPath = '/public/VJS/ss_ui/attendance/heatmap'
          scale      = 'container'
          title      = 'Weekly Breakdown'
        />

        <VJSChart
          id         = 'weekly-heatmap-stuff'
          reportPath = '/public/VJS/ss_ui/attendance/heatmap'
          scale      = 'container'
          title      = 'Weekly Breakdown'
        />
      </VJSContainer>
    )
  }
}
