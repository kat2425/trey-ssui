import React              from 'react'
import PropTypes          from 'prop-types'
import { observer }       from 'mobx-react'
import Header             from './Header'
import Title              from './Title'
import DateFormat         from 'helpers/DateFormat'
import renderIf           from 'render-if'
import NoteInfo           from '../NoteInfo'
import NoteForm           from '../NoteForm'
import _                  from 'lodash'

NoteView.propTypes = {
  store: PropTypes.object.isRequired,
  note:  PropTypes.object.isRequired
}

function NoteView({store, note}) {
  if(!_.get(note, 'isActive')) return null

  return (
    <div>
      <div>
        {renderIf(!note.isEditing) (
          <div>
            <div style={{minHeight: 450}}>
              <Header>     
                <Title>{note.title}</Title>
                {renderDate(note)}
              </Header>
              {note.body}
            </div>
            {<NoteInfo note={note} />}
          </div>
        )}   
        {renderIf(note.isEditing) (
          <NoteForm store={store} note={note} />
        )}          
      </div>
    </div>
  )
}

function renderDate(note) {
  return (
    <div style={{flex: 1, textAlign: 'right'}}>
      {getCreatedAt(note)}
      {getUpdatedAt(note)}
    </div>
  )
}

function getCreatedAt(note) {
  if(!note.createdAt) return null

  const createdAt = note.createdAt 
    ? DateFormat.shortDateTime(note.createdAt) 
    : null

  return (
    <p className='mb-0'>
      {createdAt}
    </p>
  )
}

function getUpdatedAt(note) {
  if(!note.updatedAt) return null

  const updatedAt = DateFormat.shortDateTime(note.updatedAt)

  return (
    <p>
      <span style={{color: 'darkgray'}} className='small'>
          Last Edited: {updatedAt}
      </span> 
    </p>
  )
}

export default observer(NoteView)
