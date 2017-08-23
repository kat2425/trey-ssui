import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

export default class Infractions extends Component {
  render() {
    return (
      <div>
        <ModuleHeader title='Infractions'/>

        <div className='row'>
          <VJSChart
            id         = 'infraction-top-list'
            reportPath = '/public/VJS/ss_ui/infractions/infractions_top_list'
            scale      = 'container'
            title      = 'Stuff'
            className  = 'col-md-6'
            isTable    = {true}
          />

          <VJSChart
            id         = 'tvaas-projection-range'
            reportPath = '/public/VJS/ss_ui/infractions/top_codes'
            scale      = 'container'
            title      = 'Totals by Code'
            className  = 'col-md-6'
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'bama-map'
            reportPath = '/public/VJS/ss_ui/students/my_students_detail'
            scale      = 'container'
            title      = 'Highmap'
            className  = 'col-md-12'
            isTable    = {true}
          />
        </div>
      </div>
    )
  }
}
