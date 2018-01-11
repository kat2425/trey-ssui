import React from 'react'
import PropTypes from 'prop-types'

import { Media } from 'reactstrap'

import DateFormat from 'helpers/DateFormat'
import _ from 'lodash'

const itemStyle = {
  borderLeft:   'none',
  borderRight:  'none',
  borderTop:    'none',
  borderRadius: 0
}

const InboxMMS = (props) => {
  const { mode, src, height, width, style } = props

  const modes = {
    fill: 'cover',
    fit:  'contain'
  }

  const size = modes[mode] || 'contain'

  const important = {
    backgroundImage:  `url("${src}")`,
    backgroundSize:   size,
    backgroundRepeat: 'no-repeat',
    minHeight:        '27px'
  }

  return <div {...props} style={{...style, ...important}} />
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
        <div>{ !!props.media ? <InboxMMS src={props.media}/> : _.truncate(props.message, {'length': 45}) }</div>
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
