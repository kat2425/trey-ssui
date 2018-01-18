import React         from 'react'
import { observer }  from 'mobx-react'
import styled        from 'styled-components'
import { Card }      from 'antd'
import fireEvent     from 'helpers/FireEvent'
import StudentAvatar from 'ui/shell/StudentAvatar'

function StudentInfo({student}){
  return (
    <Card 
      className = 'mt-2 text-center'
      bordered  = {false}
      bodyStyle = {{padding: 5}}
      onClick   = {showStudentCard(student)}
    >
      <StudentAvatar id={student.id} size={50} className='mx-auto mb-3' />
      <Meta
        title       = {<Title student={student} />}
        description = {<Description student={student} />}
      />
    </Card>
  )
}

const Description = ({student}) => (
  <p className='text-muted small'>{student.school_name}</p>
)

const Title = ({student}) => (
  <span className='mb-0'>
    <a 
      className='font-weight-bold small'
      onClick={showStudentCard(student)}
    >
      {`${student.last_name} ${student.first_name}`}
    </a>
    <span className='text-muted small'> {`, Grade ${student.grade}`} </span>
  </span>
)

const showStudentCard = (student) => (e) => {
  e.preventDefault()

  fireEvent('showStudentCard', { student: student.id })
}

const Meta = styled(Card.Meta)`
  & .ant-card-meta-description  {
    margin-top: -5px;
  }
`

export default observer(StudentInfo)
