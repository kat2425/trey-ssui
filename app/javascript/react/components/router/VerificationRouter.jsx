import React                            from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LastLocationProvider }         from 'react-router-last-location'
import { Provider as MobxProvider }     from 'mobx-react'
import { notification, message }        from 'antd'

import Verification                     from 'ui/shell/Verification'
import VerificationError                from 'ui/shell/Verification/Error'
import validationStore                  from 'stores/ValidationStore'

const VerificationRouter = () => {
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
              path='/verification/:id'
              component={Verification}
            />
            <Route
              component={VerificationError}
            />
          </Switch>
        </LastLocationProvider>
      </MobxProvider>
    </BrowserRouter>
  )
}

export default VerificationRouter