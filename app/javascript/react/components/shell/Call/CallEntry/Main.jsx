import React       from 'react'
import styled      from 'styled-components'
import {ifProp}    from 'styled-tools'
import PropTypes   from 'prop-types'
import ContactLink from 'ui/shell/ContactLink'

import PhoneIcon   from './PhoneIcon'

Main.propTypes = {
  call: PropTypes.shape({
    studentId:    PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isVoicemail:  PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired
  }).isRequired
}

function Main({call}){
  const {contactName, studentId, isMissedCall, isVoicemail, isIncoming} = call

  return (
    <div className='d-flex flex-row align-items-center'>
      <PhoneIcon call={call} />
      <div className='d-flex flex-column'>
        <Contact secondary={isMissedCall} name={contactName} studentId={studentId} />
        <small className='text-muted'>
          {(() => {
            if(isVoicemail) return 'voicemail'
            if(isMissedCall) return 'missed'
            return isIncoming ? 'incoming' : 'outgoing'
          })()}
        </small>
      </div>
    </div>
  )
}

const Contact = styled(ContactLink)`
  margin: 0;

  ${ifProp('secondary', `
    color: red;
  `)}
`

export default Main
