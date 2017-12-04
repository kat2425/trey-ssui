import React         from 'react'
import StudentAvatar from 'ui/shell/StudentAvatar'
import fireEvent     from 'helpers/FireEvent'

import Wrapper       from './Wrapper'
import Column        from './Column'
import Row           from './Row'

const StudentItem = ({ student, name, onStudentClick }) => {
  return (
    <Wrapper onClick={handleOnClick(onStudentClick, student)}>
      <StudentAvatar id={student.id} />
      <Column>
        <Row>
          <p className='mb-0 font-weight-bold'>{name ? name : student.last_first}</p>
          <p className='text-muted'> {student.grade != 'HE' && (', ' + student.grade)} </p>
        </Row>
        <p className='mb-0 text-muted'>{student.school}</p>
      </Column>
    </Wrapper>
  )
}

const handleOnClick = (onStudentClick, student) => () => {
  if(onStudentClick) {
    onStudentClick(student)
    return
  }

  fireEvent('showStudentCard', { student: student.id })
}

export default StudentItem
