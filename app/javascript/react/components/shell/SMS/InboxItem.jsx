import React              from 'react'
import DateFormat         from 'helpers/DateFormat'
import _                  from 'lodash'
import {ifProp}           from 'styled-tools'
import ListItem, { Text } from 'ui/shell/ListItem'
import userStore          from 'stores/UserStore'
import fireEvent          from 'helpers/FireEvent'
import omitStyled         from 'helpers/omitStyled'

const InboxItem = (props) => {
  const isUnread = !props.read && props.direction === 'inbound'
  const _studentName = `${props.studentName}'s ${props.relationship || 'Contact'}`

  return (
    <StyledMedia
      bottomLeftContainerStyle  = {{flex: 2}}
      bottomRightContainerStyle = {{flex: 1}}
      unread                    = {!props.read && props.direction === 'inbound'}
      onClick                   = {props.onClick}
      renderRightIcon           = {
        isUnread
          ? () => <ReadableSpan unread={isUnread} />
          : null
      }
      renderTopLeft={() => renderContactName(props)}
      renderTopRight={() => !userStore.user.higherEd && (
        <Text
          onClick   = {showStudentCard(props.studentId)}
          ew        = "200px"
          className = "text-muted"
          fontSize  = '80%'
          link
        >
          {_.truncate(_studentName, {'length': 25})}
        </Text>
      )}

      renderBottomLeft={() => props.media
        ? <InboxMMS src={props.media} />
        : _.truncate(props.message, {'length': 30})
      }

      renderBottomRight={() =>
        <small className='text-muted'>
          { DateFormat.timeAgo(props.time) }
        </small>
      }
    />
  )
}

function renderContactName(props) {
  const _props = userStore.user.higherEd ? {
    link:    true,
    onClick: showStudentCard(props.studentId)
  } : {}

  return (
    <h6>
      <Text {..._props}>{props.name}</Text>
    </h6>
  )
}

const omitProps = ['unread']

const StyledMedia = omitStyled(ListItem, omitProps)
  .attrs({ className: 'list-group-item' })`
  border-left:      none;
  border-right:     none;
  border-top:       none;
  border-radius:    0 !important;
  cursor:           pointer;
  background-color: #fff;
  margin:           0px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  ${ifProp('unread', `
    background-color: rgb(198,241,238);
    &:hover {
      background-color: rgba(198, 241, 238, 0.5);
    }
  `)}
`

const ReadableSpan = omitStyled('span', omitProps)
  .attrs({ className: 'ml-2 icon icon-controller-record'})`
  font-size: 12px;
  color: white;
  opacity: 0.0;
  ${ifProp('unread', `
    color:   #3f9fcf;
    opacity: 1.0;
  `)}
`

const InboxMMS = (props) => {
  const { mode, src, style } = props

  const modes = {
    fill: 'cover',
    fit:  'contain'
  }

  const size = modes[mode] || 'contain'

  const important = {
    backgroundImage:  `url("${src}")`,
    backgroundSize:   size,
    backgroundRepeat: 'no-repeat',
    minHeight:        '50px',
    width:            '100%'
  }

  return <div {...props} style={{...style, ...important}}>&nbsp;</div>
}

const showStudentCard = id => e => {
  e.stopPropagation()
  fireEvent('showStudentCard', { student: id })
}

export default InboxItem
