import React           from 'react'
import { observer }    from 'mobx-react'
import SubmoduleHeader from 'ui/shell/SubmoduleHeader'

import VJSChart  from 'ui/vjs/VJSChart'

const Assessment = ({student}) => {
  return (
    <div>
      <SubmoduleHeader title='Assessment' />

      <div>
        <VJSChart
          id         = 'sc-act-higher-ed'
          reportPath = '/public/VJS/ss_ui/assessment/act_higher_ed/student_card'
          scale      = 'container'
          title      = 'ACT'
          isTable    = {true}
          params     = {{
            student_id: [ student.id ]
          }}
        />
      </div>
    </div>
  )
}

Assessment.defaultProps = {}
Assessment.propTypes = {}

export default observer(Assessment)
