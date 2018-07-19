import React         from 'react'
import { observer }  from 'mobx-react'
import { List }      from 'antd'

import StudentAvatar from 'ui/shell/StudentAvatar'
import ContactAvatar from 'ui/shell/ContactAvatar'

const Avatar = ({ name, id, isContact = true, onClick }) => {
  return (
    <List.Item.Meta
      className = "d-flex align-items-center"
      avatar    = {getAvatar(id, isContact)}
      title     = {getTitle(name, onClick)}
    />
  )
}

const getAvatar = (id, isContact) => {
  return isContact ? (
    <ContactAvatar id={id} size={30} />
  ) : (
    <StudentAvatar id={id} size={30} />
  )
}
const getTitle = (name, onClick) => {
  return onClick ? (
    <a
      href      = "#"
      className = 'text-primary'
      onClick   = {e => {
        e.preventDefault()
        onClick()
      }}
    >
      {name}
    </a>
  ) : (
    <p>{name}</p>
  )
}

export default observer(Avatar)
