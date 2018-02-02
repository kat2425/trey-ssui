import React             from 'react'
import { Collapse, Nav } from 'reactstrap'

import UserMenuHeader    from './UserMenuHeader'

const UserMenuSection = (props) => {
  return (
    <Nav className='pt-2 mb-1' vertical>
      { props.title ? <UserMenuHeader title={props.title} /> : null }

      { props.children }
    </Nav>
  )
}

export default UserMenuSection
