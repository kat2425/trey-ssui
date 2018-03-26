import React                 from 'react'
import PropTypes             from 'prop-types'
import {observer}            from 'mobx-react'
import Wrapper               from './Wrapper'
import Title                 from './Title'
import TitleWrapper          from './TitleWrapper'
import Preview               from './Preview'
import { Badge }             from 'reactstrap'

NoteEntry.propTypes = {
  note: PropTypes.object.isRequired,
}

function NoteEntry({note}){
  return (
    <Wrapper
      active  = {note.isActive} 
      onClick = {note.handleOnNoteClick} 
    >
      <TitleWrapper>
        <Title isNew={note.isNew} title={note.title}>
          {note.title}
        </Title>
        {renderUnsavedTag(note)}   
      </TitleWrapper>
      <Preview>
        {note.body}
      </Preview>    
    </Wrapper>
  )
}

function renderUnsavedTag(note) {
  if(!note.isNew) {
    return null
  }

  return (
    <Badge className='ml-2' color='danger'>Not Saved</Badge>
  )
}

export default observer(NoteEntry)
