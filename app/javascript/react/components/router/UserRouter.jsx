import React                        from 'react'
import { BrowserRouter }            from 'react-router-dom'
import { LastLocationProvider }     from 'react-router-last-location'
import { Provider as MobxProvider } from 'mobx-react'
import { notification, message }    from 'antd'

import UserMain         from 'ui/app/UserMain'
import uiStore          from 'stores/UiStore'
import userStore        from 'stores/UserStore'
import tagStore         from 'stores/TagStore'
import groupStore       from 'stores/GroupStore'
import smsInboxStore    from 'stores/SMSInbox'
import reminderStore    from 'stores/ReminderStore'
import translationStore from 'stores/TranslationStore'

const UserRouter = props => {
  // we inject ui related user props serverside and set to window var window.SSUser = props.user
  window.SSUser = props.user

  userStore.setUser(props.user)
  tagStore.fetchSchema()
  groupStore.fetchGroups()
  smsInboxStore.fetchInbox()
  reminderStore.fetchReminders()
  translationStore.fetchLanguages()

  notification.config({
    top: 75
  })
  
  message.config({
    top:      100,
    duration: 1.5
  })

  const store = {uiStore, userStore, tagStore, translationStore}

  return (
    <BrowserRouter>
      <MobxProvider {...store}>
        <LastLocationProvider>
          <UserMain />
        </LastLocationProvider>
      </MobxProvider>
    </BrowserRouter>
  )
}

export default UserRouter
