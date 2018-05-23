import React              from 'react'
import { observer }       from 'mobx-react'
import uuid               from 'uuid'
import { Dropdown, Menu } from 'antd'
import { isDisabled }     from './config'

function CommDropdown({contacts, children, onClick, keyForValue, iconNameForValue, label}){
  return (
    <Dropdown 
      onClick = {e => e.stopPropagation()}
      trigger = {['click']}
      overlay = {menu(contacts, keyForValue, onClick, iconNameForValue, label)}
    >
      {children}
    </Dropdown>
  )
}

const MenuItem = observer(({ contact, keyForValue, onClick, iconNameForValue, label, ...rest }) => (
  <Menu.Item
    key       = {uuid()}
    disabled  = {isDisabled({ contact, contactType: keyForValue, label: label })}
    onClick   = {() => onClick(contact)}
    className = {contact.flagged ? 'text-danger' : ''}
    {...rest}
  >
    <span className={`icon icon-${iconNameForValue}`} /> {contact[keyForValue]}
  </Menu.Item>
))

const menu = (contacts, keyForValue, onClick, iconNameForValue, label) => (
  <Menu style={{ minWidth: 100 }}>
    {contacts.map(c => (
      <MenuItem
        key              = {uuid()}
        contact          = {c}
        keyForValue      = {keyForValue}
        onClick          = {onClick}
        iconNameForValue = {iconNameForValue}
        label            = {label}
      />
    ))}
  </Menu>
)

export default observer(CommDropdown)
