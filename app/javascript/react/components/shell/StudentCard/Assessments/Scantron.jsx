import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const OSTP = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-ostp'
        reportPath       = '/public/VJS/ss_ui/assessment/ostp/student_card'
        scale            = 'container'
        title            = 'OSTP'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

OSTP.defaultProps = {}
OSTP.propTypes    = {}

export default observer(OSTP)
