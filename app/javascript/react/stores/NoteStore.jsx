import { observable, action } from 'mobx'
import _xhr from 'helpers/_XHR'

class NoteStore {
  @observable notes = []
  @observable title = ''
  @observable message = ''
  @observable tags = []
  @observable groups = []
  @observable selectedGroups = []
  @observable selectedVisibilityIndex = 1
  @observable global = false
  @observable showGroups = false

  visibilityGroups = [{ name: 'Just Me', id: 1 }, { name: 'Everyone', id: 2 }, { name: 'Selected Groups', id: 3 } ]
  
  /* Notes */

  @action
  fetchStudentNotes(studentId) {

    _xhr.get(`/student_notes`, {
      params: {
        student_id: studentId,
        only: [
          'id', 'title', 'body', 'groups.id', 'global'
        ].join(',')
      }
    }).then(this.fetchStudentNotesOK)
    .then(this.fetchNoteTags(studentId))
  }

  @action.bound
  fetchStudentNotesOK(res) {
    this.notes = res.data
    console.log(res.data)
  }

  @action
  createStudentNote(studentId) {
    _xhr.post(`/student_notes`, {
      title: this.title,
      body: this.message,
      group_ids: this.selectedGroups.map((group) => { return group.id }).join(','),
      global: this.global,
      student_id: studentId
    }).then((res) => {
      this.addStudentNote(res.data)
      this.resetNoteForm()
    })
  }

  @action.bound
  deleteStudentNote(note) {
    this.removeStudentNote(note)
    _xhr.delete(`/student_notes/${note.id}`)
    this.resetNoteForm()
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
    this.notes.push(note)
    this.resetNoteForm()
  }

  @action.bound
  removeStudentNote(note){
    this.notes.splice(this.notes.indexOf(note), 1);
    console.log(this.notes)
    this.resetNoteForm()
  }

  @action
  resetNoteForm() {
    this.title = ''
    this.message = ''
    this.global = false
    this.selectedGroups = []
    this.selectedVisibilityIndex = 1
    this.showGroups = false
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
    console.log(res)
    this.groups = res.data
  }

  @action.bound
  addNoteGroup(group) {
    this.selectedGroups = group
  }

  /* Tags */

  @action.bound
  fetchNoteTags(id) {
    _xhr.get(`/student_note_tags`)
    .then((res) => this.tags = res.data)
  }
}

export default NoteStore = new NoteStore()