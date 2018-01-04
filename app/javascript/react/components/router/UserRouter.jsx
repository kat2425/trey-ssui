import React                        from 'react'
import { BrowserRouter }            from 'react-router-dom'
import { LastLocationProvider }     from 'react-router-last-location'
import { Provider as MobxProvider } from 'mobx-react'

//import 'antd/dist/antd.css'

import UserMain  from 'ui/app/UserMain'
import uiStore   from 'stores/UiStore'
import userStore from 'stores/UserStore'
import tagStore  from 'stores/TagStore'

const UserRouter = props => {
  // we inject ui related user props serverside and set to window var window.SSUser = props.user
  window.SSUser = props.user
  userStore.setUser(props.user)
  tagStore.fetchSchema()

  const store = {uiStore, userStore, tagStore}

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
