import React from 'react'
import PropTypes from 'prop-types'
import DateFormat from 'helpers/DateFormat'

import {
  Card, CardHeader, CardBlock, CardTitle, Badge
} from 'reactstrap'

import StudentAvatar   from 'ui/shell/StudentAvatar'

const cardHeader = {
  backgroundImage: 'url(https://secure.schoolstatus.com/images/student-card-overview-bg.png)',
  height:          80
}

const iconStyle = { fontSize: '16px' }

const renderItem = (item, label, icon) => {
  if (item) {
    return (
      <li>
        <span className={`mr-3 text-muted icon ${icon}`} style={iconStyle}/>
        <span>{label}: </span>
        <span className='text-info'>{ item }</span>
      </li>
    )
  }
}

const renderDOB = (dob) => {
  return DateFormat.shortDate(dob)
}

const Info = ({ student }) => {
  return (
    <Card className='card-profile mb-3'>
      <CardHeader style={cardHeader}/>

      <CardBlock className='text-xs-center mb-0 pb-1'>
        <StudentAvatar id={student.id} size={95} className='card-profile-img mx-auto' />
        <CardTitle>{student.first_name} {student.last_name}</CardTitle>
        <h6>{ student.school.school_name }</h6>

        <ul className='card-menu mb-2'>
          <li className='card-menu-item text-muted'>
            <strong>Grade</strong>
            <br/>
            <h6><Badge color='info'>{ student.grade }</Badge></h6>
          </li>

          <li className='card-menu-item text-muted'>
            <strong>Enrolled?</strong>
            <br/>
            <h6><Badge color='danger'>{ student.enrollment_status }</Badge></h6>
          </li>
        </ul>
      </CardBlock>

      <CardBlock style={{marginTop: '-5px'}} className='pt-0 pb-0 mb-0'>
        <ul className='list-unstyled list-spaced mb-2'>
          <li>
            <span className='mr-3 text-muted icon icon-share' style={iconStyle}/>
            <span>ID #: </span>
            <span className='text-info' style={{ borderBottom: '1px dotted rgba(0,0,0,0.25)' }}>
              { student.state_id }
            </span>
          </li>

          <li>
            <span className='mr-3 text-muted icon icon-cake' style={iconStyle}/>
            <span>Birthdate: </span>
            <span className='text-info'>{ renderDOB(student.dob) }</span>
          </li>

          <li>
            <span className='mr-3 text-muted icon icon-info-with-circle' style={iconStyle}/>
            <span>Race: </span>
            <span className='text-info'>{ student.race }</span>
          </li>

          <li>
            <span className='mr-3 text-muted icon icon-v-card' style={iconStyle}/>
            <span>Gender: </span>
            <span className='text-info'>{ student.gender }</span>
          </li>

          {renderItem(student.advisor, 'Advisor', 'icon-compass')}
          {renderItem(student.coach,   'Coach',   'icon-feather')}
          {renderItem(student.major,   'Major',   'icon-trophy')}
        </ul>
      </CardBlock>
    </Card>
  )
}

Info.defaultProps = {}

Info.propTypes = {}

export default Info
