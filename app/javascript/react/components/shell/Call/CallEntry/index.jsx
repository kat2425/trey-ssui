import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import Header  from './Header'
import Time    from './Time'
import Wrapper from './Wrapper'

CallEntry.propTypes = {
  call: PropTypes.shape({
    userName:     PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired,
    fullDate:     PropTypes.string.isRequired,
    timeAgo:      PropTypes.string.isRequired
  }).isRequired
}

function CallEntry({call}){
  const {fullDate, timeAgo} = call

  return (
    <Wrapper>
      <Header call={call} />
      <Time primary={fullDate} secondary={timeAgo} />
    </Wrapper>
  )
}

export default observer(CallEntry)
