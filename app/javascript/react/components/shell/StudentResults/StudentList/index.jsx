import React         from 'react'
import { observer }  from 'mobx-react'
import fireEvent     from 'helpers/FireEvent'
import styled        from 'styled-components'
import StudentAvatar from 'ui/shell/StudentAvatar'
import Paginatron    from 'ui/shell/Paginatron'
import { List }      from 'antd'

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
  const { students, pagination } = tag

  return (
    <div>
      <List
        itemLayout = "horizontal"
        dataSource = {students}
        renderItem = {student => (
          <ListItem onClick={showStudentCard(student)}>
            <ListItemMeta
              avatar      = {<StudentAvatar id={student.id} />}
              title       = {<Title student={student} />}
              description = {<Description student={student} />}
            />
          </ListItem>
        )}
      />
      <div className='mt-4'>
        <Paginatron totalPages={pagination.totalPages} currentPage={pagination.current} onChange={pagination.onChange}/>
      </div>
    </div>
  )
}

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
        {`${student.last_name}, ${student.first_name}`}
      </a>
      <span className='text-muted'> {`, Grade ${student.grade}`} </span>
    </span>
  )
})

const showStudentCard = (student) => (e) => {
  e.preventDefault()

  fireEvent('showStudentCard', { student: student.id })
}

export default observer(StudentList)
