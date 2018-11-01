import React         from 'react'
import { observer }  from 'mobx-react'
import ContactAvatar from 'ui/shell/ContactAvatar'
import { List }      from 'antd'

const NameColumn = ({contact}) => {
  return (
    <td>
      <List.Item.Meta
        className = "d-flex align-items-center"
        avatar    = {<ContactAvatar id={contact.id} size={30} />}
        title     = {contact.name}
      />
    </td>
  )
}

export default observer(NameColumn)
