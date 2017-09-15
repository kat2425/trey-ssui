import React     from 'react'
import PropTypes from 'prop-types'

import {
  Card, CardBlock
} from 'reactstrap'

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

const Demographics = ({ student }) => {
  return (
    <Card className='mb-4'>
      <CardBlock>
        <h5>Demographics</h5>

        <ul className='list-unstyled list-spaced'>
          <li>
            <span className='mr-3 text-muted icon icon-cake' style={iconStyle}/>
            <span>Birthdate: </span>
            <span className='text-info'>{ student.dob }</span>
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

Demographics.defaultProps = {}

Demographics.propTypes = {}

export default Demographics
