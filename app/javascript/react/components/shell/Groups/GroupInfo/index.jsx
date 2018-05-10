import React        from 'react'
import { observer } from 'mobx-react'
import {FaInfo}     from 'react-icons/lib/fa'
import {Popover}    from 'antd'
import DateFormat   from 'helpers/DateFormat'

const GroupInfo = ({group}) => {
  return (
    <Popover content={getGroupInfo(group)}>
      <div 
        className = 'mr-2' 
        style     = {icStyle}
      >
        <FaInfo style={{ fontSize: 12 }} />
      </div>
    </Popover>
  )
}

function getGroupInfo(group) {
  return (
    <div>
      <p>Name: {group.groupName}</p>
      <p>Created by: {group.createdBy}</p>
      <p>Members: {group.memberCount}</p>
      {getCreationDate(group)}
    </div>
  )
}

function getCreationDate(group){
  if(group.updatedAt) {
    return (
      <p>Updated at: {DateFormat.shortDateTime(group.updatedAt)}</p>
    )
  } else {
    return (
      <p>Created at: {DateFormat.shortDateTime(group.createdAt)}</p>
    )
  }
}
const icStyle = {
  backgroundColor: '#DCDCDC',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  width:           16,
  height:          16,
  borderRadius:    8
}

export default observer(GroupInfo)