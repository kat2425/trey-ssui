import React, { Component }  from 'react'
import { withRouter }        from 'react-router-dom'
import { ModalContainer }    from 'react-router-modal'

import UserMenu              from 'ui/shell/UserMenu/UserMenu'
import ActionBar             from 'ui/shell/ActionBar'
import NavBar                from 'ui/shell/NavBar'
import AppContainer          from 'ui/app/AppContainer'
import Sidebar               from 'ui/shell/SMS/Sidebar'

import CallingController     from 'ui/controllers/CallingController'
import StudentCardController from 'ui/controllers/StudentCardController'

import StudentCardStore      from 'stores/StudentCard'
import SMSInboxStore         from 'stores/SMSInbox'
import WebSocketStore        from 'stores/WebSocket'

class UserMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hideSidebar: true
    }
  }

  showStudentCard(e) {
    if (e.detail.student) {
      StudentCardStore.fetchStudent(e.detail.student)
    }
  }

  toggleSidebar(e) {
    this.setState({ hideSidebar: !this.state.hideSidebar })
  }

  componentDidMount() {
    WebSocketStore.subscribeUser(SSUser.id)

    window.addEventListener('showStudentCard', ::this.showStudentCard)
    window.addEventListener('toggleSidebar', ::this.toggleSidebar)
  }

  componentWillUnmount() {
    window.removeEventListener('showStudentCard', ::this.showStudentCard)
    window.removeEventListener('toggleSidebar', ::this.toggleSidebar)
  }

  render() {
    return (
      <div className='container-fluid pt-4'>
        <div className='row'>
          <CallingController/>
          <NavBar/>
          <UserMenu/>
          <AppContainer/>
          <ActionBar store={SMSInboxStore}/>
          <Sidebar hidden={this.state.hideSidebar}/>
          <StudentCardController/>
        </div>

      </div>
    )
  }
}

export default withRouter(UserMain)
