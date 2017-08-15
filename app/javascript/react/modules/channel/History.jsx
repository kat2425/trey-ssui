import React, { Component } from 'react'
import { render }           from 'react-dom'

import VJSContainer         from '../../components/vjs/VJSContainer'
import VJSChart             from '../../components/vjs/VJSChart'

export default class History extends Component {
  render() {
    return (
      <VJSContainer>
        <VJSChart
          id         = 'channel-history'
          reportPath = '/public/VJS/playground/call_stats_heatmap'
          scale      = 'container'
          title      = 'Hourly Call Concentration'
        />
      </VJSContainer>
    )
  }
}
