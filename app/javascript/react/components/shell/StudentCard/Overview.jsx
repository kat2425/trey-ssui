import React     from 'react'
import PropTypes from 'prop-types'

import Courses   from './Courses'

const Overview = ({student, higherEd, handleClick}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Overview
      </h4>

      <div>
        <Courses student={student} higherEd={higherEd} />
      </div>
    </div>
  )
}

Overview.defaultProps = {}

Overview.propTypes = {}

export default Overview
