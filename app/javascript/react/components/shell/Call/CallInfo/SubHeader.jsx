import React from 'react'
import { 
  MdPhone, 
  MdPhoneMissed, 
  MdPhoneForwarded,
  MdVoicemail
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

const VoicemailLabel = () => (
  <small>
    <MdVoicemail />
    <span className='ml-1'>Voicemail</span>
  </small>
)
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

const getIcon = ({isMissedCall, isIncoming, isVoicemail}) => {
  if(isVoicemail) return <VoicemailLabel />
  if(isMissedCall) return <MissedCallLabel /> 
  return isIncoming ? <IncomingCallLabel /> : <OutgoingCallLabel />
}
