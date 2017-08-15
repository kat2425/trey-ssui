import React             from 'react'
import { Collapse, Nav } from 'reactstrap'

import UserMenuHeader    from './UserMenuHeader'

const UserMenuSection = (props) => {
  return (
    <Nav className='pt-2 mb-4' vertical>
      <UserMenuHeader title={props.title} />

      {props.children}
    </Nav>
  )
}

export default UserMenuSection
