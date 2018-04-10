import React               from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'
import DeleteButton        from './DeleteButton'
import EditButton          from './EditButton'
import SaveButton          from './SaveButton'
import UpdateButton        from './UpdateButton'
import CancelButton        from './CancelButton'

ActionBar.propTypes = {
  note: PropTypes.object.isRequired
}

function ActionBar({note}){
  if(!note) return null

  return (
    <div className='d-flex justify-content-end mb-3'>
      {renderIfNew(note)}
      {renderIfEditing(note)}
      {renderIfExists(note)}
    </div>
  )
}

function renderIfNew(note){
  if(!note.isNew || note.isEditing) return null

  return (
    <div>
      <SaveButton note={note} />
      <CancelButton onClick={note.handleOnCancelCreate} />
    </div>
  )
}

function renderIfExists(note){
  if(note.isNew || note.isEditing) return null

  return (
    <div>
      <EditButton note={note} />
      <DeleteButton note={note} />
    </div>
  )
}

function renderIfEditing(note){
  if(!note.isEditing || note.isNew) return null

  return (
    <div>
      <UpdateButton note={note} />
      <CancelButton onClick={note.handleOnCancelEdit} />
      <DeleteButton note={note} />
    </div>
  )
}

export default observer(ActionBar)