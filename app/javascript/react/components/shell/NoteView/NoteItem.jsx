import React             from 'react'
import DateFormat        from 'helpers/DateFormat'
import { ListGroupItem } from 'reactstrap'

const NoteItem = ({ active, handleSelect, note }) => {
  return (
    <ListGroupItem
      active    = {active}
      className = "itemSelector__item"
      onClick   = {handleSelect}
    >
      <div className='mb-2' style={{display: 'flex', alignItems: 'flex-start', fontSize: 10}}>
        {DateFormat.shortDateTime(note.created_at)}
      </div>
      <div>
        {note.title}
      </div>
    </ListGroupItem>
  )
}

export default NoteItem