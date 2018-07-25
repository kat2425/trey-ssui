import React               from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'
import DeleteButton        from './DeleteButton'
import EditButton          from './EditButton'
import SaveButton          from './SaveButton'
import UpdateButton        from './UpdateButton'
import CancelButton        from './CancelButton'
import PrintButton         from './PrintButton'

ActionBar.propTypes = {
  note:      PropTypes.object.isRequired,
  store:     PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired
}

function ActionBar({note, store, userStore}){
  if(!note) return null

  return (
    <div className='d-flex justify-content-end mb-3'>
      <PrintButton store={store}/>
      {renderIfNew(note,userStore)}
      {renderIfEditing(note,userStore)}
      {renderIfExists(note,userStore)}
    </div>
  )
}

function renderIfNew(note,userStore){
  if(!note.isNew || note.isEditing || userStore.isParent) return null

  return (
    <div>
      <SaveButton note={note} />
      <CancelButton onClick={note.handleOnCancelCreate} />
    </div>
  )
}

function renderIfExists(note,userStore){
  if(note.isNew || note.isEditing || userStore.isParent) return null

  return (
    <div>
      <EditButton note={note} />
      <DeleteButton note={note} />
    </div>
  )
}

function renderIfEditing(note,userStore){
  if(!note.isEditing || note.isNew || userStore.isParent) return null

  return (
    <div>
      <UpdateButton note={note} />
      <CancelButton onClick={note.handleOnCancelEdit} />
      <DeleteButton note={note} />
    </div>
  )
}

export default observer(ActionBar)