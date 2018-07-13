import React                                                  from 'react'
import { BrowserRouter, Switch, Route }                       from 'react-router-dom'
import { LastLocationProvider }                               from 'react-router-last-location'
import { Provider as MobxProvider }                           from 'mobx-react'
import { notification, message }                              from 'antd'

import userStore                                              from 'stores/UserStore'

import Validation                                             from 'ui/shell/Validation'
import validationStore                                        from 'stores/ValidationStore'
import ParentAuthenticator                                    from 'ui/shell/ParentAuthenticator'

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
    validationStore
  }

  return (
    <BrowserRouter>
      <MobxProvider {...store}>
        <LastLocationProvider>
          <Switch>
            <Route
              path='/validation'
              component={Validation}
            />
            <Route
              component={ParentAuthenticator}
            />
          </Switch>
        </LastLocationProvider>
      </MobxProvider>
    </BrowserRouter>
  )
}

export default ParentRouter