import React          from 'react'
import styled         from 'styled-components'
import {ifProp}       from 'styled-tools'
import PropTypes      from 'prop-types'

import PhoneIcon      from './PhoneIcon'

Main.propTypes = {
  call: PropTypes.shape({
    userName:     PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isVoicemail:  PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired
  }).isRequired
}


function Main({call}){
  const {contactName, isMissedCall, isVoicemail, isIncoming} = call

  return (
    <div className='d-flex flex-row align-items-center'>
      <PhoneIcon call={call} />
      <div className='d-flex flex-column'>
        <Name secondary={isMissedCall}>{contactName}</Name>
        <small className='text-muted'>
          {(() => {
            if(isVoicemail) return 'voicemail'
            if(isMissedCall) return 'returned'
            return isIncoming ? 'incoming' : 'outgoing'
          })()}
        </small>
      </div>
    </div>
  )
}

const Name = styled.p`
  margin: 0;

  ${ifProp('secondary', `
    color: red;
  `)}
`

export default Main
