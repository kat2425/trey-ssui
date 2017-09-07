import React, {Component} from 'react'

import {
  Container, Button,       Card,  CardBlock,
  CardTitle, CardSubtitle, CardText,
  FormGroup, FormFeedback, Label, Input,
  Row,       Col,          Badge, ListGroup, ListGroupItem
} from 'reactstrap'

import { observer }  from 'mobx-react'
import ReactMarkdown from 'react-markdown'

import Picker        from '../Picker'
import GroupPicker   from '../GroupPicker'
import NotesForm     from '../NotesForm'
import NoteView      from '../NoteView'

@observer
export default class Notes extends Component {
  deleteNote = (note) => {
    this.props.noteStore.deleteStudentNote(note)
  }

  editNote = (note) => {
    this.props.noteStore.edit = true
    this.props.noteStore.getEditableNote(note)
  }

  render() {
    const { notes, tags, edit, isCreating } = this.props.noteStore

    return (
      <div>
        <h4 className='m-1 mb-3'>Notes</h4>

        <Card className='mb-4'>
          {isCreating
            ? <NotesForm
              noteStore   = {this.props.noteStore}
              currentNote = {notes[this.props.noteStore.selectedNoteIndex]}
              studentId   = {this.props.student.id}
            />
            : <NoteView
              onEdit    = {(note) => this.editNote(note)}
              onDelete  = {(note) => this.deleteNote(note)}
              noteStore = {this.props.noteStore}
            />
          }
        </Card>

        { notes.length > 0 && edit
          ? <NotesForm
            noteStore   = {this.props.noteStore}
            currentNote = {notes[this.props.noteStore.selectedNoteIndex]}
            studentId   = {this.props.student.id}
          />
          : null
        }
      </div>
    )
  }
}
