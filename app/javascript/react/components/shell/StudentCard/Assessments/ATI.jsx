import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const ATI = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-ati'
        reportPath       = '/public/VJS/ss_ui/assessment/ati/student_card'
        scale            = 'container'
        title            = 'ATI'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

ATI.defaultProps = {}
ATI.propTypes    = {}

export default observer(ATI)
