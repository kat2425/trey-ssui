import React         from 'react'
import { ListGroup } from 'reactstrap'
import StudentItem   from '../StudentItem'

const StudentList = ({ students, onStudentClick }) => {
  return (
    <ListGroup>
      {students.map((s) => {
        return (
          <StudentItem 
            key            = {s.id}
            onStudentClick = {onStudentClick}
            student        = {s}
          />
        )
      })}
    </ListGroup>
  )
}

export default StudentList
