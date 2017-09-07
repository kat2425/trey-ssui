import React     from 'react'
import PropTypes from 'prop-types'

import Courses   from './Courses'

const Overview = ({student, handleClick}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Overview
      </h4>

      <div>
        <Courses student={student} />
      </div>
    </div>
  )
}

Overview.defaultProps = {}

Overview.propTypes = {}

export default Overview
