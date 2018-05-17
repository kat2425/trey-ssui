import React              from 'react'
import { observer }       from 'mobx-react'
import IconMore           from 'react-icons/lib/md/chevron-right'

import ListItem           from 'ui/shell/ListItem'
import { truncate }       from 'lodash/fp'


function BroadcastEntry({ broadcast }) {
  return (
    <ListItem
      onClick         = {broadcast.handleSelect}
      renderRightIcon = {() => <IconMore className='mb-0 ml-2 h5' />}
      renderTopLeft   = {() => (
        <div className='font-weight-bold'>
          {truncate({ length: 25 }, broadcast.recipientName)}
        </div>
      )}
      renderTopRight={() => (
        <small className='text-muted'>
          {broadcast.contactsCount} contacts for {broadcast.studentsCount}{' '}
          students
        </small>
      )}
      renderBottomLeft={() => (
        <small className='text-muted'>
          {truncate({ length: 30 }, broadcast.body)}
        </small>
      )}
      renderBottomRight={() => (
        <div className='d-flex flex-column'>
          <small>{broadcast.timeAgo}</small>
        </div>
      )}
    />
  )
}

export default observer(BroadcastEntry)
