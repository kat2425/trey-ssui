import React             from 'react'
import { ResetPassword } from 'ui/shell/Authentication'
import { 
  BrowserRouter,
  Switch, 
  Route
} from 'react-router-dom'


const ResetPasswordRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path      = '/reset'
        component = {ResetPassword}
      />
    </Switch>
  </BrowserRouter>
)

export default ResetPasswordRouter
