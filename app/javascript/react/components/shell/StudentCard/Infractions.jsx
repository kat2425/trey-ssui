import React        from 'react'
import { observer } from 'mobx-react'

import VJSChart  from 'ui/vjs/VJSChart'

const Infractions = ({student}) => {
  const emptyMessage = `
  This student has zero infractions!  Reach out to one of their contacts to say,
  "Way to go!"
  `

  return (
    <div>
      <h4 className='m-1 mb-3'>
        Infractions
      </h4>

      <div>
        <VJSChart
          id               = 'sc-maap'
          reportPath       = '/public/VJS/ss_ui/infractions/student_card'
          scale            = 'container'
          title            = 'Details'
          isTable          = {true}
          ignorePagination = {true}
          emptyIcon        = {'emoji-happy'}
          emptyTitle       = 'Hooray!'
          emptyMessage     = {emptyMessage}
          params           = {{
            student_id: [ student.id ]
          }}
        />
      </div>
    </div>
  )
}

Infractions.defaultProps = {}
Infractions.propTypes = {}

export default observer(Infractions)
