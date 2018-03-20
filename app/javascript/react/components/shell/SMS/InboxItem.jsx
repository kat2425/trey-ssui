import React       from 'react'
import { Media }   from 'reactstrap'
import DateFormat  from 'helpers/DateFormat'
import _           from 'lodash'
import ContactLink from 'ui/shell/ContactLink'
import styled      from 'styled-components'
import {ifProp}    from 'styled-tools'

const StyledMedia = styled(Media).attrs({ className: 'list-group-item' })`
  border-left:      none;
  border-right:     none;
  border-top:       none;
  border-radius:    0 !important;
  cursor:           pointer;
  background-color: #fff;
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

const ReadableSpan = styled.span.attrs({ className: 'ml-2 icon icon-controller-record'})`
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
    minHeight:        '27px'
  }

  return <div {...props} style={{...style, ...important}} />
}

const InboxItem = (props) => {
  return (
    <StyledMedia unread={!props.read && props.direction === 'inbound'}>

      <Media className='pr-4 pl-2 pb-2 pt-2' left>
        {props.avatar}
      </Media>

      <Media body>
        <ContactLink tag='h6' name={props.name} studentId={props.studentId} className='d-inline-block' />
        <div>
          { props.media
            ? <InboxMMS src={props.media} />
            : _.truncate(props.message, {'length': 45})
          }
        </div>
      </Media>

      <Media right>
        <small className='text-muted'>
          { DateFormat.timeAgo(props.time) }
        </small>
      </Media>

      <Media className='pl-2' right>
        <small>
          <ReadableSpan unread={!props.read && props.direction === 'inbound'}/>
        </small>
      </Media>
    </StyledMedia>
  )
}

InboxItem.defaultProps = {}

InboxItem.propTypes = {}

export default InboxItem
