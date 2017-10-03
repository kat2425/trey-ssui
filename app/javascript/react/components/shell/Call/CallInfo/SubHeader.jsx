import React from 'react'
import { 
  MdPhone, 
  MdPhoneMissed, 
  MdPhoneForwarded 
} from 'react-icons/lib/md'

export default function SubHeader({ call }){
  const { fullDate, timeAgo } = call

  return (
    <div className='d-flex flex-column align-items-end mb-5'>
      {getIcon(call)}
      <small>
        {fullDate}
        <span className='text-muted ml-1'>
          <em> ( {timeAgo} )</em>
        </span>
      </small>
    </div>
  )
}

const MissedCallLabel = () => (
  <small>
    <MdPhoneMissed style={{color: 'red'}} />
    <span className='ml-1'>Missed Call</span>
  </small>
)
const IncomingCallLabel = () => (
  <small>
    <MdPhone />
    <span className='ml-1'>Incoming Call</span>
  </small>
)
const OutgoingCallLabel = () => (
  <small>
    <MdPhoneForwarded />
    <span className='ml-1'>Outgoing Call</span>
  </small>
)

const getIcon = ({isMissedCall, isIncoming}) => {
  if(isMissedCall) return <MissedCallLabel /> 
  return isIncoming ? <IncomingCallLabel /> : <OutgoingCallLabel />
}
