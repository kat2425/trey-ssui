import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-react'

import Header               from './Header'
import ScrollView           from './ScrollView'
import CallEntry            from '../CallEntry'
import Wrapper              from './Wrapper'

import CallInfo             from '../CallInfo'

import LoadingSpinner       from 'ui/shell/LoadingSpinner'
import VisibilitySensor     from 'react-visibility-sensor'

@inject('uiStore')
@observer
export default class CallSidebar extends Component {
  static propTypes = {
    store:   PropTypes.object.isRequired,
    show:    PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  renderInbox() {
    const { store } = this.props

    return (
      <Wrapper show={this.props.show}>
        <Header title='Recent Calls'  onClose={this.props.onClose}/>
        <ScrollView>
          {store.descCalls.map(call => <CallEntry key={call.id} call={call} />)}
          {store.isLoading && <LoadingSpinner className='d-flex flex-row justify-content-center' />}
          <VisibilitySensor onChange={store.loadMore}>
            <div className='invisible p-1'>invisible</div>
          </VisibilitySensor>
        </ScrollView>
      </Wrapper>
    )
  }

  renderConversation() {
    return (
      <CallInfo
        store    = {this.props.store}
        show     = {this.props.uiStore.showCallInfo}
        onGoBack = {() => this.props.uiStore.setShowCallInfo(false)}
      />
    )
  }

  render() {
    return (
      <div className='col-md-3' style={containerStyle}>
        <div style={barStyle}>
          { this.props.uiStore.showCallInfo ? this.renderConversation() : this.renderInbox() }
        </div>
      </div>
    )
  }
}

const containerStyle = ({
  position:      'fixed',
  top:           0,
  right:         0,
  height:        '100%',
  zIndex:        1029,
  pointerEvents: 'none',
})

const barStyle = ({
  backgroundColor: '#e8e8e8',
  zIndex:          1029,
  pointerEvents:   'all',
  width:           '100%',
  borderLeft:      '1px solid rgba(255,255,255,0.75)',
  boxShadow:       '0 -1px 2px 0 rgba(0,0,0,0.25), 0 -1px 6px rgba(0,0,0,0.175)',
  position:        'absolute',
  top:             0,
  bottom:          0,
  right:           0
})

