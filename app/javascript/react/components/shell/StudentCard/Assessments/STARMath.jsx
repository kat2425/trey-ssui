import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const STARMath = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-star-math'
        reportPath       = '/public/VJS/ss_ui/assessment/renplace/star_math/student_card'
        scale            = 'container'
        title            = 'STAR Math'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

STARMath.defaultProps = {}
STARMath.propTypes = {}

export default observer(STARMath)
