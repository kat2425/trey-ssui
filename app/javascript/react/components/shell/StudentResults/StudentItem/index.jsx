import React              from 'react'
import { ListGroupItem }  from 'reactstrap'
import StudentAvatar      from 'ui/shell/StudentAvatar'
import fireEvent          from 'helpers/FireEvent'
import WrapperLeft        from './WrapperLeft'
import WrapperRight       from './WrapperRight'

const StudentItem = ({ student, name, onStudentClick }) => {
  return (
    <ListGroupItem>
      <WrapperLeft>
        <StudentAvatar id={student.id} />
        <div style={{margin: '0px 15px'}}>
          <p className='mb-0' style={{fontWeight: 'bold'}}>
            {name ? name : student.last_first}
            <span style={{fontWeight: 'normal'}}>
              {student.grade != 'HE' && (', ' + student.grade)}
            </span>
          </p>
          <p className='mb-0' style={{color: 'lightgray'}}>{student.school}</p>
        </div>
      </WrapperLeft>

      <WrapperRight>
        <p 
          className = 'btn-link' 
          style     = {{margin: 0, cursor: 'pointer'}} 
          onClick   = { () => {
            onStudentClick 
              ? onStudentClick 
              : fireEvent('showStudentCard', { student: student.id })
          }
          }
        >
          <span className='icon icon-info'></span> 
          Student Card
        </p>
      </WrapperRight>
    </ListGroupItem>
  )
}

export default StudentItem