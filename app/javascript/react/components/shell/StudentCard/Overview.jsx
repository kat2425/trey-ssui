import React        from 'react'
import PropTypes    from 'prop-types'
import { observer } from 'mobx-react'

import Courses      from './Courses'

const Overview = ({student, higherEd}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>
        Schedule
      </h4>

      <div>
        <Courses student={student} higherEd={higherEd} />
      </div>
    </div>
  )
}

Overview.defaultProps = {}
Overview.propTypes    = {}

export default observer(Overview)
