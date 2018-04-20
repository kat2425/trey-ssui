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
import {FaInfo, FaLock}   from 'react-icons/lib/fa'
import {Popover, Tooltip} from 'antd'

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
                {getCreatedBy(note)}
                <Title>
                  {note.title}
                  {showIfModifiable(note)}
                </Title>             
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

function getCreatedBy(note) {
  if(!note.createdBy) return null

  const content = <span>{`Created by: ${note.createdBy}`}</span>

  return (
    <Popover content={content}>
      <div 
        className = 'mr-2' 
        style     = {icStyle}
      >
        <FaInfo style={{ fontSize: 12 }} />
      </div>
    </Popover>
  )
}

function showIfModifiable(note) {
  if(note.isModifiable) return null

  return (
    <Tooltip title='You cannot modify this note'>
      <FaLock className='ml-2' style={{fontSize: 18}} />
    </Tooltip>
  )
}

const icStyle = {
  backgroundColor: '#DCDCDC',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  width:           16,
  height:          16,
  borderRadius:    8
}

export default observer(NoteView)
