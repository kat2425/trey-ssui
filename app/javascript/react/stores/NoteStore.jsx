import { observable, action } from 'mobx'
import _xhr                   from 'helpers/XHR'
import _                      from 'lodash'

class NoteStore {
  @observable notes                   = []
  @observable title                   = ''
  @observable message                 = ''
  @observable tags                    = []
  @observable groups                  = []
  @observable selectedGroups          = []
  @observable selectedTags            = []
  @observable selectedVisibilityIndex = 1
  @observable selectedNoteIndex       = 0
  @observable global                  = false
  @observable showGroups              = false
  @observable edit                    = false
  @observable isCreating              = false

  visibilityGroups = [{ name: 'Just Me', id: 1 }, { name: 'Everyone', id: 2 }, { name: 'Selected Groups', id: 3 }]

  /* Notes */

  @action
  fetchStudentNotes(studentId) {
    this.selectedNoteIndex = 0
    _xhr.get(`/student_notes`, {
      params: {
        student_id: studentId,
        only: [
          'id', 
          'title', 
          'body', 
          'groups.id', 
          'global', 
          'student_note_tags.id', 
          'student_note_tags.name', 
          'groups.group_name', 
          'created_at',
          'updated_at'
        ].join(',')
      }
    }).then(this.fetchStudentNotesOK)
    .then(this.fetchNoteTags(studentId))
  }

  @action.bound
  fetchStudentNotesOK(res) {
    this.notes = res.data
  }

  @action
  createStudentNote(studentId) {
    _xhr.post(`/student_notes`, {
      title:      this.title,
      body:       this.message,
      group_ids:  this.selectedGroups.map((group) => { return group.id }).join(','),
      tag_ids:    this.selectedTags.map((tag)     => { return tag.id   }).join(','),
      global:     this.global,
      student_id: studentId
    }).then((res) => {
      this.addStudentNote(res.data)
      this.resetNoteForm()
    })
  }

  @action.bound
  deleteStudentNote(note) {
    _xhr.delete(`/student_notes/${note.id}`)
    this.removeStudentNote(note)
  }

  @action
  setNoteTitle = (title) => {
    this.title = title
  }

  @action
  setNoteMessage = (message) => {
    this.message = message
  }

  @action.bound
  addStudentNote(note){
    this.notes.unshift(note)
    this.resetNoteForm()
    this.selectedNoteIndex = 0
  }

  @action.bound
  removeStudentNote(note){
    this.notes.splice(this.notes.indexOf(note), 1)
    this.resetNoteForm()
    this.selectedNoteIndex = this.selectedNoteIndex != 0 ? this.selectedNoteIndex - 1 : 0
  }

  @action
  resetNoteForm = () => {
    this.title = ''
    this.message = ''
    this.global = false
    this.selectedGroups = []
    this.selectedTags   = []
    this.selectedVisibilityIndex = 1
    this.selectedNoteIndex = 0
    this.showGroups = false
    this.edit = false
    this.isCreating = false
  }

  /* Note Groups */

  @action.bound
  fetchGroups() {
    _xhr.get(`/groups`, {
      params: {
        type: 'user',
        only: [
          'id', 'group_name'
        ].join(',')
      }
    }).then(this.fetchGroupsOK)
  }

  @action.bound
  fetchGroupsOK(res) {
    this.groups = res.data
  }

  @action.bound
  addNoteGroup(group) {
    this.selectedGroups = group
  }

  @action.bound
  getEditableNote(note) {
    this.title = note.title
    this.message = note.body
    this.selectedGroups = note.groups
    this.selectedTags   = note.student_note_tags

    if(note.groups.length > 0) {
      this.selectedVisibilityIndex = 3
      this.showGroups = true
    } else if(!note.groups.length && note.global ) {
      this.selectedVisibilityIndex = 2
    }
    else  {
      this.selectedVisibilityIndex = 1
    }
  }

  @action.bound
  updateStudentNote(noteId) {
    _xhr.put(`/student_notes/${noteId}`, {
      title:      this.title,
      body:       this.message,
      group_ids:  this.selectedGroups.map((group) => { return group.id }).join(','),
      tag_ids:    this.selectedTags.map((tag)     => { return tag.id   }).join(','),
      global:     this.global
    }).then((res) => {
      let index = _.findIndex(this.notes, {id: noteId});

      this.notes[index] = res.data
      this.resetNoteForm()
    })
  }


  /* Tags */

  @action.bound
  fetchNoteTags() {
    _xhr.get(`/student_note_tags`)
    .then((res) => this.tags = res.data)
  }
}

export default NoteStore = new NoteStore()
