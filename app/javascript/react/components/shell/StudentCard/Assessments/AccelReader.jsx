import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const AccelReader = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-accel-reader'
        reportPath       = '/public/VJS/ss_ui/assessment/renplace/accel_reader/student_card'
        scale            = 'container'
        title            = 'Accelerated Reader'
        isTable          = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

AccelReader.defaultProps = {}
AccelReader.propTypes = {}

export default observer(AccelReader)
