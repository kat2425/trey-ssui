import React, {Component} from 'react'
import { toJS }           from 'mobx'
import { observer }       from 'mobx-react'
import _                  from 'lodash'
import DateFormat         from 'helpers/DateFormat'
import ReactMarkdown      from 'react-markdown'
import NoteTags           from '../NoteTags'
import NoteItem           from './NoteItem'
import {
  Button, Card, CardBlock,
  CardTitle, Row, Col, ListGroup
} from 'reactstrap'

@observer
export default class NoteView extends Component {
  renderNote(note) {
    return (
      <Card key={note.id} className='mb-3' style={{minHeight: 350}}>
        <div className="p-2">
          <span
            style     = {{color: '#696969', cursor: 'pointer'}}
            className = 'icon icon-trash float-right mr-2'
            onClick   = {() => this.props.onDelete(note)}
          >
            {' '}
            Delete Note
          </span>

          <span
            style     = {{color: '#696969', cursor: 'pointer'}}
            className = 'icon icon-edit float-right mr-4'
            onClick   = {() => this.props.onEdit(note)}
          >
            {' '}
            Edit Note
          </span>

        </div>

        <CardBlock>
          <CardTitle>{note.title}</CardTitle>
          <ReactMarkdown source={note.body} />
        </CardBlock>
      </Card>
    )
  }

  renderVisibleTo() {
    return (      
      <p>
        <span style={{color: '#3f9fcf'}}>Visible to: </span>
        <span style={{color: '#A9A9A9'}}>{this.renderGroupNames()}</span>
      </p>
    )
  }

  renderDate = () => {
    const { notes, selectedNoteIndex }   = this.props.noteStore
    const currentNote = notes[selectedNoteIndex]

    return (
      <p>
        <span style={{color: '#3f9fcf'}}>Created at: </span>
        <span style={{color: '#A9A9A9'}}>{DateFormat.shortDateTime(currentNote.created_at)}</span>
      </p>
    )
  }

  renderGroupNames = () => {
    const { notes }       = this.props.noteStore
    const currentNote     = notes[this.props.noteStore.selectedNoteIndex]
    const notesGroups     = currentNote.groups
    const noteStoreGroups = toJS(this.props.noteStore.groups)

    if(!notesGroups.length > 0 && !currentNote.global) {
      return 'Just Me'
    } else if(currentNote.global) {
      return 'Everyone'
    } else {
      return notesGroups.map((g) => {
        return _.find(noteStoreGroups, (group) => { return group.id === g.id })
      }).map(({group_name}) => group_name).join(', ') 
    }
  }

  renderEmptyMessage = () => {
    const { 
      isCreating, 
      edit, 
      notes,
      selectedNoteIndex
    } = this.props.noteStore

    const currentNote = notes[selectedNoteIndex]

    if(isCreating || edit) {
      return (
        <NotesForm
          noteStore   = {this.props.noteStore}
          currentNote = {currentNote}
          studentId   = {this.props.student.id}
        />
      )
    } else {
      return (
        <CardBlock style={{textAlign: 'center'}}>
          <p>No notes for this student yet.</p>
          <Button
            color   = "success"
            onClick = {() => this.props.noteStore.isCreating = true}
          >
            <span className="icon icon-plus"> Create Note</span>
          </Button>
        </CardBlock>
      )
    }
  }

  handleSelect = (index) => {
    this.props.noteStore.resetNoteForm()
    this.props.noteStore.selectedNoteIndex = index
  }

  render() {
    const {
      notes, 
      tags, 
      selectedNoteIndex 
    } = this.props.noteStore
    const currentNote = notes ? notes[selectedNoteIndex] : null

    return (
      <div>
        <Row>
          { notes.length > 0
            ? <Col sm="3">
              <CardBlock>
                <div className="itemSelector">
                  <ListGroup>
                    { notes.length > 0 &&
                      notes.map((note, index) =>  
                        <NoteItem 
                          key          = {note.id}
                          active       = {this.props.noteStore.selectedNoteIndex === index} 
                          note         = {note} 
                          handleSelect = {() => this.handleSelect(index)} 
                        />
                      )}
                  </ListGroup>
                </div>
              </CardBlock>
            </Col>
            : null
          }

          <Col sm={notes.length > 0 ? '9' : '12'}>
            <CardBlock className='pb-0'>
              { !_.isEmpty(notes) 
                ? this.renderNote(currentNote) 
                : this.renderEmptyMessage() 
              }
            </CardBlock>

            <CardBlock className="pt-0">
              <Row>
                <Col sm="6">
                  {!_.isEmpty(notes) && this.renderVisibleTo()}
                  {!_.isEmpty(notes) && this.renderDate()}
                </Col>
                {!_.isEmpty(notes && currentNote && currentNote.student_note_tags) &&
                  <NoteTags
                    notes       = {notes}
                    tags        = {tags}
                    currentNote = {currentNote}
                  />
                }
              </Row>
            </CardBlock>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <CardBlock>
              { notes.length > 0
                ? <Button
                  onClick = {() => this.props.noteStore.isCreating = true}
                  color   = "success"
                >
                  <span className="icon icon-plus"> New Note</span>
                </Button>
                : null }
            </CardBlock>
          </Col>
        </Row>
      </div>
    )
  }
}
