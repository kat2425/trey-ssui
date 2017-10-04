import React      from 'react'
import PropTypes  from 'prop-types'
import {observer} from 'mobx-react'

import Time       from './Time'
import Wrapper    from './Wrapper'
import {
  Incoming, 
  Outgoing
} from './Directions'

import {SmsIcon, CallIcon, EmailIcon} from './CommsIcons'

CommsItem.propTypes = {
  first: PropTypes.bool,
  comm:  PropTypes.shape({
    userName:     PropTypes.string.isRequired,
    contactName:  PropTypes.string.isRequired,
    isMissedCall: PropTypes.bool.isRequired,
    isIncoming:   PropTypes.bool.isRequired,
    fullDate:     PropTypes.string.isRequired,
    timeAgo:      PropTypes.string.isRequired,
    type:         PropTypes.string.isRequired,
  }).isRequired,
}

function CommsItem({comm}){
  const {
    fullDate, 
    timeAgo, 
    isIncoming, 
    userName,
    contactName,
    handleSelect,
    type,
    isActive
  } = comm

  const {first} = this.props

  return (
    <Wrapper active={isActive} first={first} onClick={handleSelect}>
      {renderIcon(type)}
      <div className='d-flex flex-column justify-content-center ml-2'>
        {isIncoming 
          ? <Incoming userName={userName} contactName={contactName} /> 
          : <Outgoing userName={userName} contactName={contactName} />       
        }
        <Time primary={fullDate} secondary={timeAgo} />
      </div>
    </Wrapper>
  )
}

const renderIcon = (type) => {
  switch(type){
  case 'sms':
    return <SmsIcon />
  case 'call':
    return <CallIcon />
  case 'email':
    return <EmailIcon />
  default:
    null
  }
}

export default observer(CommsItem)
