import React     from 'react'
import PropTypes from 'prop-types'

import VJSChart  from 'ui/vjs/VJSChart'

const FinancialAid = ({student}) => {
  return (
    <VJSChart
      id               = 'sc-financial-aid-types'
      reportPath       = '/public/VJS/ss_ui/financials/student_card'
      scale            = 'container'
      title            = 'Financial Aid Types'
      isTable          = {true}
      ignorePagination = {true}
      params           = {{
        student_id: [ student.id ]
      }}
    />
  )
}

FinancialAid.defaultProps = {}

FinancialAid.propTypes = {}

export default FinancialAid
