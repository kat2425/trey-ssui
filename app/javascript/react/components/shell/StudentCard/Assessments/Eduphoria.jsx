import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const Eduphoria = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-eduphoria'
        reportPath       = '/public/VJS/ss_ui/assessment/eduphoria/student_card'
        scale            = 'container'
        title            = 'Eduphoria'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

Eduphoria.defaultProps = {}
Eduphoria.propTypes = {}

export default observer(Eduphoria)
