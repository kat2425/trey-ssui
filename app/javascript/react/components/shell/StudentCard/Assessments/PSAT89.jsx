import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const PSAT89 = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-psat89'
        reportPath       = '/public/VJS/ss_ui/assessment/psat/psat89_student_card'
        scale            = 'container'
        title            = 'PSAT89'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

PSAT89.defaultProps = {}
PSAT89.propTypes    = {}

export default observer(PSAT89)
