import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-react'
import callStore            from 'stores/CallStore'
import reminderStore        from 'stores/ReminderStore'
import broadcastStore       from 'stores/BroadcastStore'
import Sidebar              from 'ui/shell/SMS/Sidebar'
import {CallSidebar}        from 'ui/shell/Call'
import {BroadcastSidebar}   from 'ui/shell/Broadcast'
import ReminderSidebar      from 'ui/shell/Reminders/ReminderSidebar'
import { SIDEBAR }          from 'stores/UiStore'

@inject('uiStore')
@observer
export default class SidebarController extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  renderSidebar = () => {
    const {
      setSelectedSidebar,
      selectedSidebar,
      handleReminderSidebar,
      handleBroadcastSidebar,
      handleCallSidebar } = this.props.uiStore

    switch ( selectedSidebar ) {
    case SIDEBAR.SMS:
      return (
        <Sidebar />
      )
    case SIDEBAR.CALL:
      handleCallSidebar()
      return (
        <CallSidebar
          store   = {callStore}
          show
          onClose = {() => setSelectedSidebar(null)}
        />
      )
    case SIDEBAR.REMINDER:
      handleReminderSidebar()
      return (
        <ReminderSidebar
          store   = {reminderStore}
          show
          onClose = {() => setSelectedSidebar(null)}
        />
      )
    case SIDEBAR.BROADCAST:
      handleBroadcastSidebar()
      return(
        <BroadcastSidebar
          store   = {broadcastStore}
          show
          onClose = {() => setSelectedSidebar(null)}
        />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderSidebar()}
      </div>
    )
  }
}
