import React           from 'react'
import PropTypes       from 'prop-types'
import { observer }    from 'mobx-react'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'

import Courses      from './Courses'

const Overview = ({student, higherEd}) => {
  return (
    <div>
      <SubmoduleHeader title='Schedule'/>

      <div>
        <Courses student={student} higherEd={higherEd} />
      </div>
    </div>
  )
}

Overview.defaultProps = {}
Overview.propTypes    = {}

export default observer(Overview)
