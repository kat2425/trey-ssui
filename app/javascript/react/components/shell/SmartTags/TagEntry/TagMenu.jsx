import React                  from 'react'
import { observer }           from 'mobx-react'
import styled                 from 'styled-components'
import {ifProp}               from 'styled-tools'
import { TagNameFormPopover } from 'ui/shell/SmartTags'

import { 
  Icon,
  Popconfirm,
  Menu,
  Dropdown
} from 'antd'

const menu = (tag = {}) => (
  <Menu>
    {!tag.isNew && [
      <MenuItem>
        <TagNameFormPopover 
          tag={tag}
        >
          <ActionIcon type='edit' />
          Edit Tag
        </TagNameFormPopover>
      </MenuItem>,
      <Menu.Divider />
    ]}
    {tag.isValid && [
      <MenuItem>
        <div onClick={tag.handleOnTagClick}>
          <ActionIcon type='play-circle-o' />
          Test Tag
        </div>
      </MenuItem>,
      <Menu.Divider />,
      <MenuItem>
        <div onClick={() => tag.handleOnSave()}>
          <ActionIcon type='save' />
          Save Tag
        </div>
      </MenuItem>
    ]}
    <Menu.Divider />
    <MenuItem delete>
      <Popconfirm 
        title      = "Are you sure?"
        onConfirm  = {tag.deleteTag}
        okText     = 'OK'
        cancelText = 'Cancel'
      >
        <ActionIcon type='delete' />
        Delete Tag
      </Popconfirm>
    </MenuItem>
  </Menu>
)

function TagMenu({tag}){
  return (
    <Dropdown overlay={menu(tag)}>
      <MenuIcon type='ellipsis' />
    </Dropdown>
  )
}


const MenuItem = styled(Menu.Item)`
  ${ifProp('delete', `
    color: #f5222d;
  `)}
`
const MenuIcon = styled(Icon)`
  cursor: pointer;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  &:hover{
    color: #636c72;
  }
`
const ActionIcon = styled(Icon)`
  font-size: 14px;
  margin-right: 12px;
`

export default observer(TagMenu)
