import React          from 'react'
import { observer }   from 'mobx-react'
import { withRouter } from 'react-router-dom'

import Wrapper        from './Wrapper'
import Title          from './Title'
import StudentAvatar  from 'ui/shell/StudentAvatar'

const StudentEntry = ({student, history}) => {
  return (
    <Wrapper 
      active={student.isActive} 
      onClick={handleStudentClick(student, history)} 
    >
      <div>
        <StudentAvatar id={student.id} style={{margin: '0px'}}/>
      </div>
      <Title>
        {student.fullName}
      </Title>
    </Wrapper>
  )
}

const handleStudentClick = (student, history) => () => {
  student.handleOnStudentClick((id) => history.push(`/r/students/${id}/overview`))
}


export default withRouter(observer(StudentEntry))
