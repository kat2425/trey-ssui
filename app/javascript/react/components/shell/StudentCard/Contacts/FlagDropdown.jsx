import React              from 'react'
import { observer }       from 'mobx-react'
import uuid               from 'uuid'
import { Dropdown, Menu } from 'antd'
import contactStore       from 'stores/ContactStore'

function FlagDropdown({contact, children}){
  return (
    <Dropdown 
      onClick   = {e => e.stopPropagation()}
      trigger   = {['click']}
      overlay   = {menu(contact)}
      placement = 'bottomRight'
    >
      {children}
    </Dropdown>
  )
}

const MenuItem = observer(({label, ...rest}) => (
  <Menu.Item {...rest} > {label} </Menu.Item>
))

const getMenuConfig = (contact) => {
  return [
    {
      label:    'Flag Number',
      key:      uuid(),
      onClick:  () => contactStore.handleOnFlagClick(contact),
      disabled: false
    },
    {
      label:    'Remove Flag',
      key:      uuid(),
      onClick:  () => contact.unFlagNumber(),
      disabled: !contact.canUnflag
    }
  ]
}
const menu = (contact) => (
  <Menu style={{ minWidth: 100 }}>
    {getMenuConfig(contact).map(m => <MenuItem {...m} />)}
  </Menu>
)

export default observer(FlagDropdown)
