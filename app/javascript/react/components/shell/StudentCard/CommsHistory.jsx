import React     from 'react'
import PropTypes from 'prop-types'

import { toJS }  from 'mobx'

import {
  Card
} from 'reactstrap'

import DateFormat from 'helpers/DateFormat'

const itemStyle = {
  borderLeft: '3px solid rgba(99,108,114, 0.125)'
}

const itemIconStyle = (type) => {
  const iconColor = {
    sms:  '#a5d1e7',
    call: '#b4d28d'
  }

  return {
    backgroundColor: iconColor[type],
    display:         'inline-block',
    width:           42,
    height:          42,
    textAlign:       'center',
    color:           '#fff',
    marginLeft:      '-30px',
    fontSize:        18,
    lineHeight:      '44px',
    verticalAlign:   'top'
  }
}

const ItemTypeIcon = (type) => {
  const icons = {
    sms:  'icon-chat',
    call: 'icon-phone',
  }

  return icons[type]
}

const ItemDirectionIcon = (direction) => {
  if (direction === 'inbound') {
    return 'icon-arrow-long-left'
  } else {
    return 'icon-arrow-long-right'
  }
}

const ItemContactLabel = ({contact}) => {
  return (
    <span style={{backgroundColor: '#f2f2f2', borderRadius: '10px', padding: '6px'}}>
      {contact.name}
    </span>
  )
}

const ItemInfo = ({ time, direction, user, contact }) => {
  return (
    <div style={{display: 'inline-block'}}>
      {direction === 'inbound'
        ? <span>{user.first_name} {user.last_name}</span>
        : <ItemContactLabel contact={contact}/>
      }

      <span className={`pr-2 pl-2 text-muted icon ${ItemDirectionIcon(direction)}`}/>

      {direction === 'inbound'
        ? <ItemContactLabel contact={contact}/>
        : <span>{user.first_name} {user.last_name}</span>
      }

      <br/>

      <small className='text-muted'>
        {DateFormat.fullDate(time)} at {DateFormat.time12Hour(time)}

        <em>
          <span className='ml-2' style={{opacity: '0.75'}}>
            ({DateFormat.timeAgo(time)})
          </span>
        </em>
      </small>
    </div>
  )
}

const CommsItem = ({ item }) => {
  return (
    <li style={itemStyle} className='p-2 pt-3 pb-0'>
      <span style={itemIconStyle(item.type)} className='rounded-circle mr-3'>
        <span className={`icon ${ItemTypeIcon(item.type)}`}/>
      </span>

      <ItemInfo time={item.created_at} direction={item.direction} user={item.user} contact={item.contact}/>
    </li>
  )
}

// const renderHistory = (comms) => {
//   if (!!comms.length) {
//   } else {
//   }
// }

const Engagement = ({student, communications}) => {
  return (
    <div>
      <h4 className='m-1 mb-3'>Engagement</h4>

      <Card>
        <ul style={{listStyle: 'none'}}>
          { toJS(communications).map(c => <CommsItem key={c.id} item={c}/>) }
        </ul>
      </Card>
    </div>
  )
}

Engagement.defaultProps = {}

Engagement.propTypes = {}

export default Engagement
