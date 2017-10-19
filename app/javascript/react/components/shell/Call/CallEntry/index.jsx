import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'
import IconMore   from 'react-icons/lib/md/chevron-right'

import Main       from './Main'
import Wrapper    from './Wrapper'

import TimeFormat from 'helpers/TimeFormat'

CallEntry.propTypes = {
  call: PropTypes.shape({
    userName:     PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isVoicemail:  PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired,
    fullDate:     PropTypes.string.isRequired,
    timeAgo:      PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired
  }).isRequired
}

function CallEntry({call}){
  const {handleSelect, recordingDuration, isMissedCall, timeAgo} = call

  return (
    <Wrapper onClick={handleSelect}>
      <Main call={call} />
      <div className='d-flex flex-column align-items-end ml-auto'>
        <small>{timeAgo}</small>
        {!isMissedCall && <small className='text-muted'>{TimeFormat.formatMSS(recordingDuration)}</small>}
      </div>
      <IconMore className='mb-0 ml-3 h5'/>
    </Wrapper>
  )
}

export default observer(CallEntry)
