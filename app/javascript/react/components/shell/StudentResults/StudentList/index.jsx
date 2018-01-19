import React          from 'react'
import { observer }   from 'mobx-react'
import fireEvent      from 'helpers/FireEvent'
import styled         from 'styled-components'
import LoadingSpinner from 'ui/shell/LoadingSpinner'

import {
  Avatar as Avtr,
  List,
  Button
} from 'antd'

const ListItemMeta = List.Item.Meta
const ListItem = styled(List.Item)`
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  &:hover{
    background-color:  rgba(0, 0, 0, 0.08);
  }
`

const StudentList = ({tag}) => {
  const { students } = tag

  return (
    <List
      itemLayout = "horizontal"
      dataSource = {students}
      loadMore   = {loadMore(tag)}
      renderItem = {student => (
        <ListItem onClick={showStudentCard(student)}>
          <ListItemMeta
            avatar      = {<Avatar student={student} />}
            title       = {<Title student={student} />}
            description = {<Description student={student} />}
          />
        </ListItem>
      )}
    />
  )
}

const Avatar = observer(function Avatar({student}){
  return (
    <Avtr src={`https://api.schoolstatus.com/avatars/student/${student.id}.png`} />
  )
})

const Description = observer( function Description({student}){
  return (
    <p className='text-muted'>{student.school_name}</p>
  )
})

const Title = observer(function Title({student}){ 
  return (
    <span className='mb-0'>
      <a 
        className='font-weight-bold'
        onClick={showStudentCard(student)}
      >
        {`${student.last_name} ${student.first_name}`}
      </a>
      <span className='text-muted'> {`, Grade ${student.grade}`} </span>
    </span>
  )
})

const loadMore = (tag) => {
  return tag.pagination.showLoadingMore ? (
    <div style={{ textAlign: 'center', marginTop: 12, height: 50, lineHeight: '50px' }}>
      {tag.isFetchingStudents && <LoadingSpinner center />}
      {!tag.isFetchingStudents && <Button onClick={tag.pagination.loadMore}>Load More</Button>}
    </div>
  ) : null
}

const showStudentCard = (student) => (e) => {
  e.preventDefault()

  fireEvent('showStudentCard', { student: student.id })
}

export default observer(StudentList)
