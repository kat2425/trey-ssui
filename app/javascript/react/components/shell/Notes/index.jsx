import React, {Component}     from 'react'
import { 
    Container, Button, Card, CardBlock,
    CardTitle, CardSubtitle, CardText,
    FormGroup, FormFeedback, Label, Input,
    Row, Col, Badge
} from 'reactstrap'
import { observer }           from 'mobx-react'
import ReactMarkdown          from 'react-markdown'

import Picker                 from '../Picker'
import GroupPicker            from '../GroupPicker'
import NotesForm              from '../NotesForm'
import NoteTags              from '../NoteTags'


@observer
export default class Notes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
  }

  renderNote(note) {
    return (
      <Card key={note.id} className='mb-3'>
        <CardBlock>
            <span style={{color: '#696969', cursor: 'pointer'}} className='icon icon-trash float-right' onClick={() => this.deleteNote(note)}> Delete Note</span>
          <CardTitle>{note.title}</CardTitle>
          <ReactMarkdown source={note.body} />
        </CardBlock>
      </Card>
    )
  }

  renderEmptyMessage() {
    return (
      <Card className='mb-3'>
        <CardBlock>
          <CardText>No notes for this student yet.</CardText>
        </CardBlock>
      </Card>
    )
  }

  renderGroupNames() {
    const { notes } = this.props.noteStore
    const currentNote = notes[this.state.selectedIndex]
    const notesGroups = currentNote.groups;
    const noteStoreGroups = this.props.noteStore.groups.toJS()

    if(!notesGroups.length > 0 && !currentNote.global) {
      return 'Just Me'
    }
    else if(currentNote.global) {
      return 'Everyone'
    }
    else {
      return notesGroups.map((g) => {
        return _.find(noteStoreGroups, (group) => { return group.id === g.id })
      }).map(({group_name}) => group_name).join(', ')
    }
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

  renderStudentNoteTags(notes) {
    return (
      <CardBlock className='float-right'>
      <p>
        <span style={{color: '#A9A9A9'}}>{notes.length > 0 ? this.renderTagNames() : null}</span>
      </p>
      </CardBlock>  
    )
  }

  deleteNote = (note) => {
    const { notes } = this.props.noteStore
    this.props.noteStore.deleteStudentNote(note)
    this.setState({ selectedIndex: 0 })
  }

  render() {
    const { notes, visibilityGroups, groups, tags } = this.props.noteStore
    return (
      <Card className='mb-4'>
        <CardBlock>
          <h4 className='m-1 mb-3'>Notes</h4>
        </CardBlock>
        <Row>
          <Col sm="3">
            <CardBlock>
              <Input type="select" onChange={(e) => this.setState({ selectedIndex: e.target.selectedIndex })} size="md" multiple>
                { notes.length > 0 ? notes.map(note => <option key={note.id}>{note.title}</option>) : this.renderEmptyMessage() }
              </Input>
            </CardBlock>
          </Col>
          <Col sm="9">
            <CardBlock>
              { notes.length > 0 ? this.renderNote(notes[this.state.selectedIndex]) : this.renderEmptyMessage() }
            </CardBlock>
            <CardBlock>
              <Row>
                {notes.length > 0 && this.renderVisibleTo(notes)}
                {notes.length > 0 && <NoteTags notes={notes} tags={tags} currentNote={notes[this.state.selectedIndex]}/>}
              </Row>
            </CardBlock>
          </Col>
        </Row>
        <NotesForm noteStore={this.props.noteStore} studentId={this.props.student.id} />
      </Card>
    )
  }
}
