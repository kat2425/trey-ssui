import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const Case21 = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-maap'
        reportPath       = '/public/VJS/ss_ui/assessment/case21/student_card'
        scale            = 'container'
        title            = 'Case21'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

Case21.defaultProps = {}
Case21.propTypes = {}

export default observer(Case21)
