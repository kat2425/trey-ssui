import React         from 'react'
import StudentAvatar from 'ui/shell/StudentAvatar'
import fireEvent     from 'helpers/FireEvent'

import Wrapper       from './Wrapper'
import Column        from './Column'
import Row           from './Row'

const StudentItem = ({ student, onStudentClick }) => {
  return (
    <Wrapper onClick={handleOnClick(onStudentClick, student)}>
      <StudentAvatar id={student.id} />
      <Column>
        <Row>
          <p className='mb-0 font-weight-bold'>{`${student.last_name} ${student.first_name}`}</p>
          <p className='text-muted'> {`, Grade ${student.grade}`} </p>
        </Row>
        <p className='mb-0 text-muted'>{student.school_name}</p>
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
