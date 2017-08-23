import React from 'react'
import PropTypes from 'prop-types'

import {
  Card, CardHeader, CardBlock, CardTitle, Badge
} from 'reactstrap'

import StudentAvatar   from 'ui/shell/StudentAvatar'

const cardHeader = {
  backgroundImage: 'url(https://secure.schoolstatus.com/images/student-card-overview-bg.png)',
  height: 80
}

const Info = ({ student }) => {
  return (
    <Card className='card-profile mb-4'>
      <CardHeader style={cardHeader}/>

      <CardBlock className='text-xs-center mb-0'>
        <StudentAvatar id={student.id} size={95} className='card-profile-img mx-auto' />
        <br/>
        <CardTitle>{student.first_name} {student.last_name}</CardTitle>
        <h6>{ student.school.school_name }</h6>
        <br/>

        <ul className='card-menu'>
          <li className='card-menu-item'>
            <strong>ID Number</strong>
            <br/>
            <h6><Badge color='success'>{student.state_id}</Badge></h6>
          </li>

          <li className='card-menu-item'>
            <strong>Grade</strong>
            <br/>
            <h6><Badge color='info'>{ student.grade }</Badge></h6>
          </li>

          <li className='card-menu-item'>
            <strong>Enrolled?</strong>
            <br/>
            <h6><Badge color='danger'>{ student.enrollment_status }</Badge></h6>
          </li>
        </ul>
      </CardBlock>
    </Card>
  )
}

Info.defaultProps = {}

Info.propTypes = {}

export default Info
