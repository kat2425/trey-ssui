import React       from 'react'
import { NavLink } from 'reactstrap'

const navHeader = { opacity: '0.8' }

const UserMenuHeader = ({title}) => {
  return (
    <NavLink className='pr-4 pl-4 p-1'>
      <h6 style={navHeader} className='text-muted mb-1 mt-2'>{title}</h6>
    </NavLink>
  )
}

export default UserMenuHeader
