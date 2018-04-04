import React              from 'react'
import PropTypes          from 'prop-types'
import { observer }       from 'mobx-react'
import IconMore           from 'react-icons/lib/md/chevron-right'

import fireEvent          from 'helpers/FireEvent'
import TimeFormat         from 'helpers/TimeFormat'

import ListItem, { Text } from 'ui/shell/ListItem'
import PhoneIcon          from './PhoneIcon'
import userStore          from 'stores/UserStore'
import { truncate }       from 'lodash/fp'

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

function CallEntry({ call }) {
  const {
    handleSelect,
    recordingDuration,
    isMissedCall,
    timeAgo,
    studentName,
    studentId,
    isVoicemail,
    isIncoming,
    relationship
  } = call

  const _studentName = `${studentName}'s ${relationship || 'Contact'}`

  return (
    <ListItem
      onClick={handleSelect}
      renderLeftIcon={() => <PhoneIcon call={call} />}
      renderRightIcon={() => <IconMore className="mb-0 ml-2 h5" />}
      renderTopLeft={() => renderContactName(call)}
      renderTopRight={() => !userStore.user.higherEd && (
        <Text
          onClick={showStudentCard(studentId)}
          className="text-muted"
          link
          fontSize='80%'
        >
          {truncate({'length': 25}, _studentName)}
        </Text>
      )}
      renderBottomLeft={() => (
        <small className="text-muted">
          {(() => {
            if (isVoicemail) return 'voicemail'
            if (isMissedCall) return 'returned'
            return isIncoming ? 'incoming' : 'outgoing'
          })()}
        </small>
      )}
      renderBottomRight={() => (
        <div className="d-flex flex-column">
          <small>
            <span style={{color: 'rgba(0,0,0,0.5)'}}>
              {!isMissedCall && (
                `${TimeFormat.formatMSS(recordingDuration) + ' | '}`
              )}
            </span>
            {timeAgo}           
          </small>
        </div>
      )}
    />
  )
}

function renderContactName(props) {
  const _props = userStore.user.higherEd ? {
    link:    true,
    onClick: showStudentCard(props.studentId)
  } : {}

  return (
    <h6 style={{ color: props.isMissedCall ? 'red' : 'inhreit' }}>
      <Text {..._props}>{props.contactName}</Text>
    </h6>
  )
}

const showStudentCard = id => e => {
  e.stopPropagation()
  fireEvent('showStudentCard', { student: id })
}

export default observer(CallEntry)
