import React, { Component }  from 'react'
import { withRouter } from 'react-router-dom'
import { withLastLocation }  from 'react-router-last-location'

import UserMenu              from 'ui/shell/UserMenu/UserMenu'
import ActionBar             from 'ui/shell/ActionBar'
import NavBar                from 'ui/shell/NavBar'
import AppContainer          from 'ui/app/AppContainer'
import Sidebar               from 'ui/shell/SMS/Sidebar'

import CallingController     from 'ui/controllers/CallingController'

import StudentCardStore      from 'stores/StudentCard'
import SMSInboxStore         from 'stores/SMSInbox'
import WebSocketStore        from 'stores/WebSocket'

import VJSContainer          from 'ui/vjs/VJSContainer'

@withRouter
@withLastLocation
class UserMain extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hideSidebar: true
    }
  }

  showStudentCard (e) {
    const {history} = this.props

    if (e.detail.student) {
      history.push(`${history.location.pathname}/students/${e.detail.student}`)
    }
  }

  onCloseStudentCard (e) {
    const { history, lastLocation } = this.props

    if (lastLocation) {
      history.goBack()
    } else {
      history.push('/r/my_students')
    }
  }

  toggleSidebar (e) {
    this.setState({ hideSidebar: !this.state.hideSidebar })
  }

  componentDidMount () {
    WebSocketStore.subscribeUser(SSUser.id)

    window.addEventListener('showStudentCard', ::this.showStudentCard)
    window.addEventListener('onCloseStudentCard', ::this.onCloseStudentCard)
    window.addEventListener('toggleSidebar', ::this.toggleSidebar)
  }

  componentWillUnmount () {
    window.removeEventListener('showStudentCard', ::this.showStudentCard)
    window.removeEventListener('onCloseStudentCard', ::this.onCloseStudentCard)
    window.removeEventListener('toggleSidebar', ::this.toggleSidebar)
  }

  render () {
    return (
      <VJSContainer>
        <div className='container-fluid pt-4'>
          <div className='row'>
            <CallingController />
            <NavBar />
            <UserMenu />
            <AppContainer />
            <ActionBar store={SMSInboxStore} />
            <Sidebar hidden={this.state.hideSidebar} />
          </div>
        </div>
      </VJSContainer>
    )
  }
}

export default UserMain
