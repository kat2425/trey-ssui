import React             from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserMain          from '../app/UserMain'

const UserRouter = (props) => {
  // we inject ui related user props serverside and set to window var
  window.SSUser = props.user

  return (
    <BrowserRouter>
      <UserMain/>
    </BrowserRouter>
  )
}

export default UserRouter
