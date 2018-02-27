import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const PSATNM = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-psatnm'
        reportPath       = '/public/VJS/ss_ui/assessment/psat/psat_nm_student_card'
        scale            = 'container'
        title            = 'PSATNM'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

PSATNM.defaultProps = {}
PSATNM.propTypes    = {}

export default observer(PSATNM)
