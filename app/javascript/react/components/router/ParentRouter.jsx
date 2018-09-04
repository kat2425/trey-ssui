import React                            from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LastLocationProvider }         from 'react-router-last-location'
import { Provider as MobxProvider }     from 'mobx-react'
import { notification, message }        from 'antd'

import userStore                        from 'stores/UserStore'
import uiStore                          from 'stores/UiStore'
import contactStore                     from 'stores/ContactStore'

import Validation                       from 'ui/shell/Validation'
import validationStore                  from 'stores/ValidationStore'
import translationStore                 from 'stores/TranslationStore'
import ParentAuthenticator              from 'ui/shell/ParentAuthenticator'
import ParentPage                       from 'ui/shell/Parent/ParentPage'
import BrowserMessage                   from 'ui/shell/BrowserMessage'

const ParentRouter = props => {
  window.SSUser = props.user
  userStore.setUser(props.user)

  notification.config({
    top: 75
  })

  message.config({
    top:      100,
    duration: 1.5
  })

  const store = {
    validationStore,
    uiStore,
    contactStore,
    translationStore,
    userStore
  }

  return (
    <BrowserRouter>
      <MobxProvider {...store}>
        <LastLocationProvider>
          <Switch>
            <Route
              path='/r/validation'
              component={Validation}
            />
            <Route
              path='/r/students'
              component={ParentPage}
            />
            <Route
              component={ParentAuthenticator}
            />
          </Switch>
        </LastLocationProvider>
        <BrowserMessage />
      </MobxProvider>
    </BrowserRouter>
  )
}

export default ParentRouter
