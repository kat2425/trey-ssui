import React, {Component} from 'react'
import { observer }       from 'mobx-react'
import _                  from 'lodash'

import {
  Container, Button, Card, CardBlock,
  CardTitle, CardSubtitle, CardText,
  FormGroup, FormFeedback, Label, Input,
  Row, Col, Badge, ListGroup, ListGroupItem
} from 'reactstrap'

import ReactMarkdown from 'react-markdown'
import NoteTags      from '../NoteTags'

@observer
export default class NoteView extends Component {
  renderNote(note) {
    return (
      <Card key={note.id} className='mb-3' style={{minHeight: 350}}>
        <div className="float-right p-2">
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

  renderVisibleTo(notes) {
    return (
      <Col sm="6">
        <p>
          <span style={{color: '#3f9fcf'}} className='icon icon-eye'> </span>
          <span style={{color: '#3f9fcf'}}>Visible to: </span>
          <span style={{color: '#A9A9A9'}}>{notes.length > 0 ? this.renderGroupNames() : null}</span>
        </p>
      </Col>
    )
  }

  renderGroupNames() {
    const { notes }       = this.props.noteStore
    const currentNote     = notes[this.props.noteStore.selectedNoteIndex]
    const notesGroups     = currentNote.groups
    const noteStoreGroups = this.props.noteStore.groups.toJS()

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
    const { isCreating, edit, notes} = this.props.noteStore

    if(isCreating || edit) {
      return (
        <NotesForm
          noteStore   = {this.props.noteStore}
          currentNote = {notes[this.props.noteStore.selectedNoteIndex]}
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

  render() {
    const { notes, tags } = this.props.noteStore

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
                        this.props.noteStore.selectedNoteIndex === index
                          ? <ListGroupItem
                            active
                            className = "itemSelector__item"
                            onClick   = {() => { this.props.noteStore.resetNoteForm(); this.props.noteStore.selectedNoteIndex = index }}
                            key       = {note.id}
                          >
                            {note.title}
                          </ListGroupItem>
                          : <ListGroupItem
                            className = "itemSelector__item"
                            onClick   = {() => { this.props.noteStore.resetNoteForm(); this.props.noteStore.selectedNoteIndex = index  }}
                            key       = {note.id}>{note.title}
                          </ListGroupItem>
                      )
                    }
                  </ListGroup>
                </div>
              </CardBlock>
            </Col>
            : null
          }

          <Col sm={notes.length > 0 ? '9' : '12'}>
            <CardBlock>
              { notes.length > 0 ? this.renderNote(notes[this.props.noteStore.selectedNoteIndex]) : this.renderEmptyMessage() }
            </CardBlock>

            <CardBlock className="pt-0">
              <Row>
                {notes.length > 0 && this.renderVisibleTo(notes)}
                {notes.length > 0 &&
                  <NoteTags
                    notes       = {notes}
                    tags        = {tags}
                    currentNote = {notes[this.props.noteStore.selectedNoteIndex]}
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
