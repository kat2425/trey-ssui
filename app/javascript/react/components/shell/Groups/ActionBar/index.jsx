import React               from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'
import DeleteButton        from './DeleteButton'
import EditButton          from './EditButton'
import SaveButton          from './SaveButton'
import UpdateButton        from './UpdateButton'
import CancelButton        from './CancelButton'

ActionBar.propTypes = {
  group: PropTypes.object.isRequired
}

function ActionBar({group}){
  if(!group) return null

  return (
    <div className='d-flex justify-content-end'>
      {renderIfNew(group)}
      {renderIfEditing(group)}
      {renderIfExists(group)}
    </div>
  )
}

function renderIfNew(group){
  if(!group.isNew) return null

  return (
    <div>
      <SaveButton group={group} />
      <CancelButton onClick={group.handleOnCancelCreate} />
    </div>
  )
}

function renderIfExists(group){
  if(group.isNew || group.isEditing) return null

  return (
    <div>
      <EditButton group={group} />
      <DeleteButton group={group} />
    </div>
  )
}

function renderIfEditing(group){
  if(!group.isEditing || group.isNew) return null

  return (
    <div>
      <UpdateButton group={group} />
      <CancelButton onClick={group.handleOnCancelEdit} />
      <DeleteButton group={group} />
    </div>
  )
}

export default observer(ActionBar)