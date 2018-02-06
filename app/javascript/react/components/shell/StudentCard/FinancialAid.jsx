import React         from 'react'
import { observer }  from 'mobx-react'
import PropTypes     from 'prop-types'

import VJSChart      from 'ui/vjs/VJSChart'

const FinancialAid = ({student}) => {
  return (
    <div>
      <VJSChart
        id               = 'sc-financial-aid-types'
        reportPath       = '/public/VJS/ss_ui/financials/student_card'
        scale            = 'container'
        title            = 'Financial Aid'
        isTable          = {true}
        ignorePagination = {true}
        params           = {{
          student_id: [ student.id ]
        }}
      />
    </div>
  )
}

FinancialAid.defaultProps = {}

FinancialAid.propTypes = {}

export default observer(FinancialAid)
