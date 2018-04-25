import React                   from 'react'
import { observer }            from 'mobx-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CallBar                 from 'ui/shell/ActionBar/Calling/CallBar'
import CallNotesDialog         from 'ui/shell/ActionBar/Calling/CallNotesDialog'
import intercomIcon            from 'images/intercom-icon.svg'
import { SIDEBAR }             from 'stores/UiStore'
import userStore               from 'stores/UserStore'
import { UPGRADE }             from 'helpers/UserAlerts'

import {
  Badge,
  Button,
  Nav,
  NavItem as NavItm,
  Navbar
} from 'reactstrap'


const NavItem = ({style, ...rest}) =>
  <NavItm {...rest} style={{...style, cursor: 'pointer'}}/>

const channelCheck = (caller, item) => {
  const { user } = userStore

  if (user.hasChannel) {
    caller(item)
  } else {
    alert(UPGRADE[item])
  }
}

const expirationStatusNag = () => {
  const { user } = userStore
  const {
    districtExpirationStatus,
    daysUntilExpiration,
    isDistrictLevel
  } = user

  const message = do {
    if (districtExpirationStatus === 'warning') {
      `It looks like it's time to renew! Your account expires in ${daysUntilExpiration} days.`
    } else if (districtExpirationStatus === 'grace') {
      'Your district has expired. You are now in a grace period.'
    }
  }

  if (districtExpirationStatus === 'warning' || districtExpirationStatus === 'grace') {
    return (
      <NavItem className='mr-auto'>
        <span style={{color: '#c36b69'}} className='icon icon-warning mr-2'/>
        <span>{ message }</span>

        {isDistrictLevel &&
          <a href='mailto:renewal@schoolstatus.com?Subject=Renewal%20Quote' target='_blank'>
            <Button
              className = 'ml-2'
              size      = 'sm'
              color     = 'warning'
              style     = {{marginBottom: '1px'}}
            >
              Request Renewal Quote
            </Button>
          </a>
        }
      </NavItem>
    )
  }
}

function ActionBar({callingStore, uiStore, reminderStore, store}) {
  const { callBarVisible }     = callingStore
  const { setSelectedSidebar } = uiStore
  const { totalUnread }        = store
  const { totalPending }       = reminderStore

  return (
    <Navbar style={getActionBarStyle(callingStore)} fixed='bottom' className='nav'>
      <Nav className='d-flex flex-row justify-content-end p-3' navbar>

        {!callBarVisible && expirationStatusNag()}

        {callBarVisible &&
        <NavItem className='mr-auto'>
          <ReactCSSTransitionGroup
            transitionName         = "callBar"
            transitionEnterTimeout = {500}
            transitionLeaveTimeout = {300}
          >
            <CallBar callingStore={callingStore}/>
          </ReactCSSTransitionGroup>
        </NavItem>
        }

        <NavItem className='ml-4' onClick={() => channelCheck(setSelectedSidebar, SIDEBAR.REMINDER)}>
          <span className='icon icon-clock mr-2' style={{opacity: '0.6'}}/>
          <span>Reminders</span>
          <Badge
            color  = 'success'
            style  = {actionBarNotification}
            hidden = {totalPending < 1}
            pill
          >
            {totalPending}
          </Badge>
        </NavItem>

        <NavItem className='ml-4' onClick={() => setSelectedSidebar(SIDEBAR.CALL)}>
          <span className='icon icon-voicemail mr-2' style={{opacity: '0.6'}}/>
          <span>Calls</span>
        </NavItem>

        <NavItem className='ml-4' onClick={() => channelCheck(setSelectedSidebar, SIDEBAR.SMS)}>
          <span className='icon icon-chat mr-2' style={{opacity: '0.6'}}/>
          <span>Messages</span>
          <Badge
            color  = 'danger'
            style  = {actionBarNotification}
            hidden = {totalUnread < 1}
            pill
          >
            {totalUnread}
          </Badge>
        </NavItem>

        {!userStore.isImpersonated && (
          <NavItem className='ml-4 rounded-circle' style={intercomButtonStyle} id='intercom-ss-launcher'>
            <img src={intercomIcon} style={{width: '32px', height: '32px', marginTop: '-6px'}}/>
          </NavItem>
        )}
      </Nav>
      <CallNotesDialog callingStore={this.props.callingStore} />
    </Navbar>
  )
}

const intercomButtonStyle = {
  backgroundColor: '#2f4050',
  height:          '38px',
  width:           '38px',
  marginTop:       '-9px',
  fontSize:        '25px',
  textAlign:       'center',
  boxShadow:       [
    'inset 0 1px rgba(255,255,255, 0.9)',
    '0 1px rgba(255,255,255, 0.9)',
    '0 1px 1px rgba(255,255,255, 0.9)'
  ].join(',')
}

const actionBarNotification = {
  fontSize:      '70%',
  verticalAlign: 'top',
  boxShadow:     '0 1px 2px 0 rgba(0,0,0,0.2)'
}

const getActionBarStyle = ({isCalling, isConferenceCalling, callBarVisible}) => ({
  backgroundColor: getActionBarStyleBg({isCalling, isConferenceCalling, callBarVisible}),
  boxShadow:       '1px 0px 2px 0 rgba(0,0,0,0.25), 1px 0 6px 0 rgba(0,0,0,0.175)',
  padding:         0,
  zIndex:          9999,
  border:          'none',
  maxHeight:       50,
  transition:      '0.5s all',
  color:           (isCalling ? '#ffffff' : ((!isCalling && callBarVisible) ? '#ffffff' : '#292b2c')),
})

const getActionBarStyleBg = ({isCalling, isConferenceCalling, callBarVisible}) => {
  const { user }                     = userStore
  const { districtExpirationStatus } = user
  const showExpirationStatus         = (
    districtExpirationStatus === 'warning' ||
    districtExpirationStatus === 'grace'
  )

  if (showExpirationStatus && !callBarVisible) {
    return '#f3dc9a'
  } else {
    return (isCalling || isConferenceCalling)
      ? '#5cb85c'
      : (!isCalling && callBarVisible)
        ? '#d9534f'
        : '#e8e8e8'
  }
}

export default observer(ActionBar)
