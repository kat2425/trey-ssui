import React                  from 'react'
import { observer }           from 'mobx-react'
import styled                 from 'styled-components'
import {ifProp}               from 'styled-tools'
import { TagNameFormPopover } from 'ui/shell/SmartTags'
import uuid                   from 'uuid'
import store                  from 'stores/TagStore'

import { 
  Icon,
  Popconfirm,
  Menu,
  Dropdown,
  Button
} from 'antd'

const menu = (tag = {}, store = {}) => (
  <Menu>
    {!tag.isNew && [
      <MenuItem key={uuid()}>
        <TagNameFormPopover 
          tag={tag}
        >
          <ActionIcon type='edit' />
          Edit
        </TagNameFormPopover>
      </MenuItem>,
      <Menu.Divider key={uuid()} />
    ]}
    {tag.isValid && [
      <MenuItem key={uuid()}>
        <div onClick={tag.handleOnTagClick}>
          <ActionIcon type='play-circle-o' />
          Test
        </div>
      </MenuItem>,
      <Menu.Divider key={uuid()} />,
      <MenuItem key={uuid()}>
        <div onClick={() => tag.handleOnSave()}>
          <ActionIcon type='save' />
          Save
        </div>
      </MenuItem>
    ]}
    <Menu.Divider />
    <MenuItem>
      <div onClick={() => store.cloneTag(tag)}>
        <ActionIcon type='copy' />
        Clone
      </div>
    </MenuItem>
    <Menu.Divider />
    <MenuItem delete>
      <Popconfirm 
        title      = "Are you sure?"
        onConfirm  = {tag.deleteTag}
        okText     = 'OK'
        cancelText = 'Cancel'
      >
        <ActionIcon type='delete' />
        Delete
      </Popconfirm>
    </MenuItem>
  </Menu>
)

function TagMenu({tag}){
  return (
    <Dropdown 
      onClick = {e => e.preventDefault()}
      trigger = {['click']}
      overlay = {menu(tag, store)}
    >
      <MenuBtn icon='ellipsis' size='small'/>
    </Dropdown>
  )
}


const MenuItem = styled(Menu.Item)`
  ${ifProp('delete', `
    color: #f5222d;
  `)}
`
const MenuBtn = styled(Button)`
  margin-left: 5px;
  border-color: transparent;
  background-color: transparent;
  &:hover{
    border-color: #40a9ff;
    background-color: white;
  }

  & > .anticon{
    font-size: 18px;
    margin-top: 2px;
  }
`
const ActionIcon = styled(Icon)`
  font-size: 14px;
  margin-right: 12px;
`

export default observer(TagMenu)
