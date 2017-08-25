import React                    from 'react'
import { BrowserRouter }        from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import UserMain from 'ui/app/UserMain'

const UserRouter = props => {
  // we inject ui related user props serverside and set to window var window.SSUser = props.user
  window.SSUser = props.user
  return (
    <BrowserRouter>
      <LastLocationProvider>
        <UserMain />
      </LastLocationProvider>
    </BrowserRouter>
  )
}

export default UserRouter
