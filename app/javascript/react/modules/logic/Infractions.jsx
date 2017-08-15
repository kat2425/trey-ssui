import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSContainer         from 'ui/vjs/VJSContainer'
import VJSChart             from 'ui/vjs/VJSChart'

export default class Infractions extends Component {
  render() {
    return (
      <VJSContainer>
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
            reportPath = '/public/VJS/playground/highmap'
            scale      = 'container'
            title      = 'Highmap'
            className  = 'col-md-12'
          />
        </div>
      </VJSContainer>
    )
  }
}
