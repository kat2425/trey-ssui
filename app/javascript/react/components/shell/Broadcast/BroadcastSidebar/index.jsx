import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Wrapper              from './Wrapper'
import Header               from './Header'
import ScrollView           from './ScrollView'
import BroadcastEntry       from '../BroadcastEntry'
import BroadcastInfo        from '../BroadcastInfo'
import BroadcastModal       from '../BroadcastModal'

import LoadingSpinner       from 'ui/shell/LoadingSpinner'

@inject('uiStore')
@observer
export default class BroadcastSidebar extends Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  renderOutbox = () => {
    const { store } = this.props

    return (
      <Wrapper show={this.props.show}>
        <Header
          title='Broadcast Messages'
          onClose={this.props.onClose}
          onNewMessage={this.showModal}
        />
        <ScrollView>
          {store.descBroadcasts.map((broadcast) => {
            return (
              <BroadcastEntry
                key={broadcast.id}
                broadcast={broadcast}
              />)}
          )}
          {store.isLoading && <LoadingSpinner className='d-flex flex-row justify-content-center' />}
        </ScrollView>
        <BroadcastModal
          store    = {this.props.store}
          visible  = {this.state.visible}
          onCancel = {this.closeModal}
        />
      </Wrapper>
    )
  }

  renderBroadcastInfo = () => {
    return (
      <BroadcastInfo
        store    = {this.props.store}
        show     = {this.props.uiStore.showBroadcastInfo}
        onGoBack = { () => this.props.uiStore.setShowBroadcastInfo(false)}
      />
    )
  }

  render() {
    return (
      <div className='col-md-3' style={containerStyle}>
        <div style={barStyle}>
          { this.props.uiStore.showBroadcastInfo
            ? this.renderBroadcastInfo()
            : this.renderOutbox()
          }
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
