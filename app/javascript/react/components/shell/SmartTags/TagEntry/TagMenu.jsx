import React                  from  'react'
import { observer }           from  'mobx-react'
import styled                 from  'styled-components'
import {ifProp}               from  'styled-tools'
import { TagNameFormPopover } from  'ui/shell/SmartTags'
import shortid                from  'shortid'

import { 
  Icon,
  Popconfirm,
  Menu,
  Dropdown,
  Button
} from 'antd'

const menu = (tag = {}) => (
  <Menu>
    {!tag.isNew && [
      <MenuItem key={shortid()}>
        <TagNameFormPopover 
          tag={tag}
        >
          <ActionIcon type='edit' />
          Edit Tag
        </TagNameFormPopover>
      </MenuItem>,
      <Menu.Divider key={shortid()} />
    ]}
    {tag.isValid && [
      <MenuItem key={shortid()}>
        <div onClick={tag.handleOnTagClick}>
          <ActionIcon type='play-circle-o' />
          Test Tag
        </div>
      </MenuItem>,
      <Menu.Divider key={shortid()} />,
      <MenuItem key={shortid()}>
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
    <Dropdown onClick={e => e.preventDefault()}trigger={['click']} overlay={menu(tag)}>
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
  margin-left: 10px;
  border-color: transparent;
  background-color: transparent;
  &:hover{
    border-color: #40a9ff;
    background-color: white;
  }
`
const ActionIcon = styled(Icon)`
  font-size: 14px;
  margin-right: 12px;
`

export default observer(TagMenu)
