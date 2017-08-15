import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSContainer         from 'ui/vjs/VJSContainer'
import VJSChart             from 'ui/vjs/VJSChart'

export default class TVAAS extends Component {
  constructor(props) {
    super(props)
  }

  testClick() {
    console.log('test-click')
    this.props.store.fetchConversation()
  }

  render() {
    return (
      <VJSContainer>
        <ModuleHeader title='TVAAS'/>

        <div className='row'>
          <VJSChart
            id         = 'tvaas-projection-range'
            reportPath = '/public/VJS/ss_ui/assessment/tvaas/projection_range'
            scale      = 'container'
            title      = 'Projection Ranges'
            className  = 'col-md-7'
          />

          <VJSChart
            id         = 'tvaas-probabilities'
            reportPath = '/public/VJS/ss_ui/assessment/tvaas/average_probabilities'
            scale      = 'container'
            title      = 'Probabilities'
            className  = 'col-md-5'
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'tvaas-average-by-test'
            reportPath = '/public/VJS/ss_ui/assessment/tvaas/average_by_test'
            title      = 'Average Projected Percentiles'
            className  = 'col-md-12'
          />
        </div>

        <div className='row'>
          <VJSChart
            id         = 'tvaas-student-detail'
            reportPath = '/public/VJS/ss_ui/assessment/tvaas/tvaas_student_detail'
            title      = 'Student Detail'
            className  = 'col-md-12'
            isTable    = {true}
          />
        </div>
      </VJSContainer>
    )
  }
}
