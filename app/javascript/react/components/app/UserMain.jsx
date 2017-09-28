import React, { Component }    from 'react'
import { withRouter }          from 'react-router-dom'
import _                       from 'lodash'
import { inject, observer }    from 'mobx-react'

import UserMenu                from 'ui/shell/UserMenu/UserMenu'
import ActionBar               from 'ui/shell/ActionBar'
import NavBar                  from 'ui/shell/NavBar'
import AppContainer            from 'ui/app/AppContainer'
import Sidebar                 from 'ui/shell/SMS/Sidebar'
import {CallSidebar, CallInfo} from 'ui/shell/Call'

import CallingController       from 'ui/controllers/CallingController'

import SMSInboxStore           from 'stores/SMSInbox'
import CallingStore            from 'stores/CallingStore'
import WebSocketStore          from 'stores/WebSocket'
import SMSConversationStore    from 'stores/SMSConversation'
import callStore               from 'stores/CallStore'

import VJSContainer            from 'ui/vjs/VJSContainer'

@withRouter
@inject('uiStore')
@observer
class UserMain extends Component {
  constructor(props) {
    super(props)

    this.currentPath = null
  }

  showStudentCard = (e) => {
    const {history, location} = this.props

    this.currentPath = location.pathname
    if (e.detail.student) {
      history.push(`${this.currentPath}/students/${e.detail.student}/overview`)
    }
  }

  onCloseStudentCard = () => {
    const { history, uiStore } = this.props

    // Reset side bar to normal height
    uiStore.setSidebarMaxHeight(false)

    if (this.currentPath) {
      history.push(this.currentPath)
    } else {
      history.push('/r/my_students')
    }
  }

  toggleCallSidebar = () => {
    this.props.uiStore.toggleCallSidebar()
  }

  toggleSidebar = (e) => {
    const { uiStore }  = this.props
    const contact = _.get(e, 'detail.contact')

    if(contact){
      SMSConversationStore
        .initiateConversation(contact)
      return
    }

    uiStore.setSidebarMaxHeight(false)
    uiStore.toggleSidebar()
  }

  componentDidMount() {
    WebSocketStore.subscribeUser(window.SSUser.id)

    window.addEventListener('showStudentCard', this.showStudentCard)
    window.addEventListener('onCloseStudentCard', this.onCloseStudentCard)
    window.addEventListener('toggleSidebar', this.toggleSidebar)
    window.addEventListener('toggleCallSidebar', this.toggleCallSidebar)

    window.intercomSettings = {
      app_id:     'c443b08a556eb87a1f39f088cda1b1f93e3a6631',
      user_id:    window.SSUser.id,
      user_hash:  window.SSUser.intercomUserHash,
      name:       `${window.SSUser.firstName} ${window.SSUser.lastName}`,
      first_name: window.SSUser.firstName,
      last_name:  window.SSUser.lastName,
      email:      window.SSUser.username,
      created_at: window.SSUser.createdAt,

      company: {
        id:   window.SSUser.districtID,
        name: window.SSUser.districtName,
      },

      custom_launcher_selector: '#intercom-ss-launcher'
    }

    setTimeout(function() {
      $('.intercom-launcher-frame').contents().find('.intercom-launcher').attr('style', 'display:none')
      $('.intercom-launcher-frame').attr('style', 'box-shadow:none !important;-webkit-box-shadow:none !important')
    }, 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('showStudentCard', this.showStudentCard)
    window.removeEventListener('onCloseStudentCard', this.onCloseStudentCard)
    window.removeEventListener('toggleSidebar', this.toggleSidebar)
  }

  render() {
    const { uiStore } = this.props

    return (
      <VJSContainer>
        <div className='container-fluid pt-4'>
          <div className='row'>
            <CallingController store={CallingStore} />
            <NavBar />
            <UserMenu />
            <AppContainer />
            <ActionBar store={SMSInboxStore} callingStore={CallingStore}/>
            <Sidebar />
            <CallSidebar
              store   = {callStore}
              show    = {uiStore.showCallSidebar}
              onClose = {this.toggleCallSidebar}
            />
            <CallInfo 
              store    = {callStore}
              show     = {uiStore.showCallInfo}
              onGoBack = {() => uiStore.setShowCallInfo(false)}
            />
          </div>
        </div>
      </VJSContainer>
    )
  }
}

export default UserMain
