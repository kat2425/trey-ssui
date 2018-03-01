import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const STAREarlyLit = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-star-early-lit'
        reportPath       = '/public/VJS/ss_ui/assessment/renplace/star_early_lit/student_card'
        scale            = 'container'
        title            = 'STAR Early Lit'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

STAREarlyLit.defaultProps = {}
STAREarlyLit.propTypes = {}

export default observer(STAREarlyLit)
