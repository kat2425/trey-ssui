import React     from 'react'
import PropTypes from 'prop-types'

import { 
  MdPhone, 
  MdPhoneMissed, 
  MdPhoneForwarded 
} from 'react-icons/lib/md'

PhoneIcon.propTypes = {
  call: PropTypes.shape({
    isMissedCall: PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired
  }).isRequired
}

export default function PhoneIcon({call}){
  const {isMissedCall, isIncoming} = call

  return (
    <div className='mr-3'>
      {(() => {
        if(isMissedCall) return <MdPhoneMissed />
        return isIncoming ? <MdPhone /> : <MdPhoneForwarded />
      })()}
    </div>
  )
}
