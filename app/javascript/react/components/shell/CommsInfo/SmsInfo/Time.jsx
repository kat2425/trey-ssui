import React      from 'react'
import DateFormat from 'helpers/DateFormat'

const footerDirection = incoming => !incoming ? 'ml-2' : 'float-right mr-2'

const Time = ({time, isIncoming}) => (
  <div className={`media-footer mb-3 text-muted ${footerDirection(isIncoming)}`}>
    <small>{DateFormat.time12Hour(time)}</small>
  </div>
)

export default Time
