import React        from 'react'
import { observer } from 'mobx-react'
import styled       from 'styled-components'
import {ifProp}     from 'styled-tools'
import uuid         from 'uuid'
import store        from 'stores/TagStore'

import { 
  Icon,
  Popconfirm,
  Menu,
  Dropdown,
  Button
} from 'antd'

const menu = (tag = {}, store = {}) => (
  <Menu style={{minWidth: 100}}>
    {!tag.isNew && tag.modifiable && [
      <MenuItem key={uuid()}>
        <div onClick={() => store.editTag(tag)}>
          <ActionIcon type='edit' />
          Edit
        </div>
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
      <Menu.Divider key={uuid()} />
    ]}
    {tag.isValid && tag.modifiable && [
      <MenuItem key={uuid()}>
        <div onClick={() => tag.handleOnSave()}>
          <ActionIcon type='save' />
          Save
        </div>
      </MenuItem>,
      <Menu.Divider key={uuid()}/>
    ]}
    {[
      <MenuItem key={uuid()}>
        <div onClick={() => store.cloneTag(tag)}>
          <CopyIcon/>
          Clone
        </div>
      </MenuItem>,
      <Menu.Divider key={uuid()}/>
    ]}
    {(tag.isNew || tag.modifiable) && [
      <MenuItem key={uuid()} delete>
        <Popconfirm
          title      = {`Are you sure you want to delete ${tag.name} ?`}
          onConfirm  = {tag.deleteTag}
          okText     = {'Delete'}
          cancelText = {'Cancel'}
        >
          <ActionIcon type='delete' />
          Delete
        </Popconfirm>
      </MenuItem>
    ]}
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
    color: #f5222d !important;
  `)}
`
const MenuBtn = styled(Button)`
  margin-left: 5px;
  border-color: transparent;
  background-color: transparent;
  &:hover{
    color: #59b2d9 !important;
    background-color: #fff !important;
    border-color: #59b2d9 !important;
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
const CopyIcon = styled.span.attrs({
  className: 'icon icon-documents text-muted'
})`
  font-size: 14px;
  margin-right: 12px;
`
export default observer(TagMenu)
