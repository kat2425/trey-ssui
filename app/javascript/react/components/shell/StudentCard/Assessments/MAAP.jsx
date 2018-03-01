import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const MAAP = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-maap'
        reportPath       = '/public/VJS/ss_ui/assessment/maap/student_card'
        scale            = 'container'
        title            = 'MAAP'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

MAAP.defaultProps = {}
MAAP.propTypes    = {}

export default observer(MAAP)
