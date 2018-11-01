import React         from 'react'
import PropTypes     from 'prop-types'

import RecipientList from './RecipientList'

RecipientBlock.propTypes = {
  broadcast: PropTypes.object.isRequired
}

function RecipientBlock(broadcast){
  return(
    <div className='mb-4'>
      <div className='font-weight-bold mb-2 mt-2'>
        Sent To:
      </div>
      <RecipientList broadcast={broadcast.broadcast} />
    </div>
  )
}

export default RecipientBlock
