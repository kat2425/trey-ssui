import React          from 'react'
import { observer }   from 'mobx-react'
import styled         from 'styled-components'
import { List }       from 'antd'
import SSButton       from 'ui/shell/SSButton' 
import Title          from './Title'
import Description    from './Description'
import fireEvent      from 'helpers/FireEvent'
import StudentAvatar  from 'ui/shell/StudentAvatar'

const MemberItem = ({group, member}) => {
  return (
    <ListItem onClick={() => handleOnClick(group, member)}>
      <ListItemMeta
        style       = {{ flex: 3 }}
        avatar      = {showAvatar(group, member)}
        title       = {<Title type={group.groupType} member={member} />}
        description = {<Description group={group} member={member} />}
      />
      {showRemoveButton(group, member)}
    </ListItem>
  )
}

function showAvatar(group, member) {
  if(group.groupType !== 'student') return null
  console.log('showavatar')
  return (
    <StudentAvatar id={member.id} size={42}/>
  )
}

function handleOnClick(group, member) {
  if(group.groupType !== 'student') return null

  return showStudentCard(member)
}

function showRemoveButton(group, member) {
  if(!group.isEditing && !group.isNew) return null

  return(
    <SSButton
      style     = {{padding: '2px 4px'}}
      onClick   = {() => group.removeMember(member)}
      color     = 'danger'
      iconClass = 'icon icon-trash text-white'
      iconStyle = {{ marginRight: '0px' }}
    />
  )
}

const showStudentCard = (student) => (e) => {
  e.preventDefault()
  fireEvent('showStudentCard', { student: student.id })
}


const ListItemMeta = List.Item.Meta
const ListItem = styled(List.Item)`
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
  cursor: pointer;
  &:hover{
    background-color:  rgba(0, 0, 0, 0.025);
  }
`

export default observer(MemberItem)