import React from 'react'
import PropTypes from 'prop-types'

import { Media } from 'reactstrap'

import DateFormat from 'helpers/DateFormat'

const itemStyle = {
  borderLeft:   'none',
  borderRight:  'none',
  borderTop:    'none',
  borderRadius: 0
}

const InboxItem = (props) => {
  const unreadColor = ((props.read) ? 'text-clear' : ((props.direction === 'inbound') ? 'text-primary' : 'text-clear' ))

  return (
    <Media className='list-group-item' style={itemStyle}>

      <Media className='pr-4 pl-2 pb-2 pt-2' left>
        {props.avatar}
      </Media>

      <Media body>
        <h6>{props.name}</h6>

        {props.message}
      </Media>

      <Media right>
        <small className='text-muted'>
          { DateFormat.timeAgo(props.time) }
        </small>
      </Media>

      <Media className='pl-2' right>
        <small>
          <span className={`ml-2 ${unreadColor}`} style={{fontSize: 9}}>&#11044;</span>
        </small>
      </Media>
    </Media>
  )
}

InboxItem.defaultProps = {}

InboxItem.propTypes = {}

export default InboxItem
