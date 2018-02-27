import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart     from 'ui/vjs/VJSChart'

const CogAT = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-cogat'
        reportPath       = '/public/VJS/ss_ui/assessment/cogat/student_card'
        scale            = 'container'
        title            = 'CogAT'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

CogAT.defaultProps = {}
CogAT.propTypes    = {}

export default observer(CogAT)
