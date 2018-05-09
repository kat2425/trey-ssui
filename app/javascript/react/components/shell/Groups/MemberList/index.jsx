import React          from 'react'
import { observer }   from 'mobx-react'
import fireEvent      from 'helpers/FireEvent'
import styled         from 'styled-components'
import StudentAvatar  from 'ui/shell/StudentAvatar'
import Paginatron     from 'ui/shell/Paginatron'
import { List }       from 'antd'
import LoadingSpinner from 'ui/shell/LoadingSpinner'
import SSButton       from 'ui/shell/SSButton' 

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

const MemberList = ({group, store, paginate = true}) => {
  const { members, pagination } = group
  const { shouldSearch, searchResults } = store

  return (
    <div>
      <GList
        locale     = {{emptyText: 'No members yet'}}
        itemLayout = 'horizontal'
        loading    = {loading(group, store)}
        dataSource = {shouldSearch ? searchResults : members.values().reverse()}
        renderItem = {(member) => renderItem(group, member)}
      />
      <div className='mt-4'>
        {(paginate && pagination.totalPages > 1) &&
          <Paginatron 
            totalPages  = {pagination.totalPages}
            currentPage = {pagination.current}
            onChange    = {pagination.onChange}
          />
        }
      </div>
    </div>
  )
}

function renderItem(group, member) {
  return (
    <ListItem>
      <ListItemMeta
        onClick={group.groupType === 'student' && showStudentCard(member)}
        style={{flex: 3}}
        avatar      = {group.groupType === 'student' && <StudentAvatar id={member.id} size={42}/>}
        title       = {<Title type={group.groupType} member={member} />}
        description = {<Description group={group} member={member} />}
      />
      {(group.isEditing || group.isNew ) &&
        <SSButton
          style     = {{padding: '2px 4px'}}
          onClick   = {() => group.removeMember(member)}
          color     = 'danger'
          iconClass = 'icon icon-trash text-white'
          iconStyle = {{ marginRight: '0px' }}
        />
      }
    </ListItem>
  )
}

const GList = styled(List)`
  & .ant-spin-dot {
    margin-left: -32px !important;
    width: auto !important;
    height: auto !important;
  }
`

const loading = (group, store) => ({
  spinning:  group.isFetchingMembers || store.isSearching,
  indicator: <LoadingSpinner center />
})

const Description = observer( function Description({group, member}){
  const schoolName = member.school_name 
    ? member.school_name 
    : (member.school 
      ? member.school.school_name 
      : null)

  return (
    <div>
      {group.groupType === 'student' && <p className='text-muted'>{schoolName}</p>}
      <p className='text-muted'>{member.username}</p>
    </div>
  )
})

const Title = observer(function Title({type, member}){ 
  return (
    <span className='mb-0'>
      <span className='d-inline-block font-weight-bold' style={{color: '#292B2C'}}>
        {`${member.full_name}`}
      </span>
      {type === 'student' && <span className='text-muted'> {`, Grade ${member.grade}`} </span>}
    </span>
  )
})

const showStudentCard = (student) => (e) => {
  e.preventDefault()

  fireEvent('showStudentCard', { student: student.id })
}

export default observer(MemberList)
