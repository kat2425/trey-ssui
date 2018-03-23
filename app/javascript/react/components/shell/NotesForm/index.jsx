import React, { Component }   from 'react'
import { observer }           from 'mobx-react'
import Picker                 from '../Picker'
import GroupPicker            from '../GroupPicker'
import moment                 from 'moment'
import {
  Button, Card, CardBlock,
  FormGroup, FormFeedback, 
  Label, Input,
} from 'reactstrap'

@observer
export default class NotesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titleError: null,
      bodyError:  null
    }
  }

  handleTagChange(val) {
    this.props.noteStore.selectedTags = val
  }

  handleTimeStamp = () => {
    const { message, setNoteMessage } = this.props.noteStore

    setNoteMessage(message + moment().format('MMM D, YYYY h:mm A'))
  }

  submitNote = () => {
    if (!this.props.noteStore.title) {
      this.setState({ titleError: 'danger' })
      return false
    } else {
      this.setState({ titleError: null })
    }

    if (!this.props.noteStore.message) {
      this.setState({ bodyError: 'danger' })
      return false
    } else {
      this.setState({ bodyError: null })
    }

    if(!this.props.noteStore.edit) {
      this.props.noteStore.createStudentNote(this.props.studentId)
    } else {
      const { notes }       = this.props.noteStore
      const { currentNote } = this.props

      this.props.noteStore.updateStudentNote(currentNote.id)
    }
  }

  render() {
    const { notes, visibilityGroups, groups, tags, selectedTags, edit } = this.props.noteStore

    return (
      <Card style={{border: 'none'}} className="mt-2">
        <CardBlock>
          <FormGroup color={this.state.titleError}>
            <Label for="title">Title</Label>

            <Input
              onChange  = {(e) => this.props.noteStore.setNoteTitle(e.target.value)}
              value     = {this.props.noteStore.title}
              type      = "text"
              name      = "text"
            />
            { this.state.titleError && <FormFeedback>Oops! You must enter a title.</FormFeedback> }
          </FormGroup>

          <FormGroup color={this.state.bodyError}>
            <div className='d-flex justify-content-between mb-2'>
              <Label for="message">Body</Label>
              <Button onClick={this.handleTimeStamp} size='sm'>
                <span
                  className = 'mr-1 icon icon-clock text-muted'
                /> 
                Timestamp
              </Button>
            </div>
            <Input
              onChange = {(e) => this.props.noteStore.setNoteMessage(e.target.value)}
              value    = {this.props.noteStore.message}
              type     = "textarea"
              name     = "text"
              rows     = {7}
            />
            { this.state.bodyError && <FormFeedback>Oops! You must enter a note message.</FormFeedback> }
          </FormGroup>

          <FormGroup>
            <Label for="tags">Visible to</Label>

            <GroupPicker
              labelKey   = {'name'}
              valueKey   = {'id'}
              defaultKey = {1}
              groupKey   = {3}
              options    = {visibilityGroups}
              groups     = {groups}
              note       = {notes[this.state.selectedIndex]}
            />
          </FormGroup>

          <FormGroup>
            <Label for="tags">Tags</Label>

            <Picker
              placeholder    = {'Select tags...'}
              multi
              selectedValues = {selectedTags}
              handleChange   = {(val) => this.handleTagChange(val)}
              options        = {tags}
              labelKey       = {'name'}
              valueKey       = {'id'}
            />
          </FormGroup>

          <Button
            className = 'float-right mt-4'
            onClick   = {() => this.submitNote()}
          >
            {edit ? 'Update' : 'Save'}
          </Button>

          <Button
            className = 'float-right mt-4 mr-2'
            onClick = {() => { this.props.noteStore.edit = false; this.props.noteStore.resetNoteForm() }}
          >
              Cancel
          </Button>
        </CardBlock>
      </Card>
    )
  }
}
