import { 
  observable, 
  action, 
  computed, 
  runInAction
} from 'mobx'
import { setter }    from 'mobx-decorators'
import _             from 'lodash'
import xhr           from 'helpers/XHR'
import moment        from 'moment'
import getError      from 'helpers/ErrorParser'

export default class Note {
  id                                   = null
  noteStore                            = null
  @setter @observable isEditing        = false
  @setter @observable isNew            = false
  @setter @observable isSelectingGroup = false 
  @setter @observable isSaving         = false
  @setter @observable isUpdating       = false
  @setter @observable isDeleting       = false
  @setter @observable isDefaultTitle   = true
  @observable createdBy                = null
  @observable createdAt                = null
  @observable updatedAt                = null
  @observable tags                     = null
  @observable title                    = null 
  @observable body                     = null
  @observable global                   = false
  @observable groups                   = null
  @observable tags                     = null


  constructor(conf = {}, parentStore, json = {}){
    this.init(conf, parentStore, json)
  }

  /* Computed */

  @computed get isActive(){
    return this.noteStore.selectedNote === this
  }

  @computed get hasTitle(){
    return !_.isEmpty(this.title)
  }

  @computed get hasBody(){
    return !_.isEmpty(this.body)
  }

  @computed get isGlobal(){
    return this.global
  }

  @computed get hasGroups(){
    return !_.isEmpty(this.groups)
  }

  @computed get hasTags() {
    return !_.isEmpty(this.tags)
  }

  @computed get defaultTags() {
    if(this.hasTags) {
      return this.tags.map((t) => { return {key: t.id || t.key, label: t.name || t.label} })
    } else {
      return []
    }
  }

  @computed get defaultGroups() {
    if(this.hasGroups) {
      return this.groups.map((t) => { return {key: t.id || t.key, label: t.group_name || t.label} })
    } else {
      return []
    }
  }

  @computed get defaultVisibility() {
    if(this.isGlobal) {
      return 'Everyone'
    } else if(this.hasGroups) {
      return 'Groups'
    } else {
      return 'Just Me'
    }
  }

  @computed get showGroupSelector() {
    return this.isSelectingGroup 
  }

  @computed get shouldFocusTitle() {
    return this.isNew && this.isDefaultTitle
  }

  /* End Computed */

  /* Actions */

  @action init = (
    {isNew = false} = {},
    parentStore, 
    json
  ) => {
    this.isNew = isNew
    this.noteStore  = parentStore
    !_.isEmpty(json) && this.updateFromJson({...json})
    if(this.isNew) {
      this.createdAt = moment().format()
      this.setActive()
    }
  }

  @action setActive = () => {
    this.noteStore.setSelectedNote(this)
  }

  @action handleOnNoteClick = () => {
    this.setActive()
  }

  @action handleOnCancelCreate = () => {
    this.noteStore.notes.delete(this.noteStore.selectedNote.id)
    this.noteStore.setSelectedNote(this.noteStore.orderedNotes[0])
  }

  @action handleOnEditClick = () => {
    this.setIsEditing(true)
    this.noteStore.originalNote.set(this.id, this)
  }

  @action handleOnCancelEdit = () => {
    const {selectedNote, originalNote} = this.noteStore

    selectedNote.title = originalNote.get(this.id).title
    selectedNote.body  = originalNote.get(this.id).body
    originalNote.delete(this.id)
    this.setIsEditing(false)
  }

  @action handleVisibilitySelect = (e) => {
    switch(e) {
    case 'Just Me':
      this.global = false
      this.groups = []
      this.setIsSelectingGroup(false)
      break
    case 'Everyone':
      this.global = true
      this.groups = []
      this.setIsSelectingGroup(false)
      break
    case 'Groups':
      this.global = false
      this.setIsSelectingGroup(true)
      break
    default:
      this.global = false
      this.groups = []
      this.setIsSelectingGroup(false)
    }
  }

  @action updateFromJson = ({
    id,
    title,
    groups,
    body,
    created_at: createdAt,
    updated_at: updatedAt,
    student_note_tags,
    global,
    user
  }) => {
    this.id         = id
    this.title      = title
    this.groups     = groups
    this.body       = body
    this.createdBy  = user ? user.full_name : null
    this.createdAt  = createdAt
    this.updatedAt  = updatedAt
    this.tags       = student_note_tags
    this.global     = global

    this.setIsSelectingGroup(this.hasGroups)
  }

  @action saveNote = async() => { 
    if(!this.hasBody || !this.hasTitle) {
      const message = !this.hasBody ? 'Your note must have a body!' : 'Your note must have a title!'

      this.noteStore.setIsMessage({message, type: 'error'})
      return null
    }

    const {studentID} = this.noteStore

    try {
      this.setIsSaving(true)
      const { data } = await xhr.post('/student_notes', this.getNoteParams(studentID))

      this.saveNoteOK(data)
    } catch(error) {
      this.noteStore.setIsError(getError(error))
    } finally {
      this.setIsSaving(false)
    }
  }

  @action saveNoteOK = (data) => {
    const { selectedNote, notes } = this.noteStore

    const note =  notes.get(this.id)
    const oldID = selectedNote.id

    this.setIsNew(false)
    this.updateFromJson(data)   
    notes.delete(oldID)
    notes.set(note.id, note)
    this.noteStore.setIsMessage({message: 'Note saved!', type: 'success'})
  }

  @action getNoteParams = (studentID) => {
    return {
      title:      this.title,
      body:       this.body,
      student_id: studentID,
      tag_ids:    this.tags && this.tags.map((t) => t.key).join(','),
      global:     this.global,
      group_ids:  this.groups && this.groups.map((g) => g.key || g.id).join(',')
    }
  }
  
  @action deleteNote = async() => {
    try {
      this.setIsDeleting(true)
      await xhr.delete(`/student_notes/${this.id}`)

      runInAction(() => {   
        this.shiftAfterDeletion()
        this.noteStore.notes.delete(this.id)
        this.noteStore.setIsMessage({message: 'Note deleted!', type: 'success'})    
      })
    } catch (error) {
      this.noteStore.setIsError(getError(error))
    } finally {
      this.setIsDeleting(false)
    }
  }

  @action updateNote = async() => {
    const params = {
      title:     this.title,
      body:      this.body,
      tag_ids:   this.tags.map((t) => t.key || t.id).join(','),
      global:    this.global,
      group_ids: this.groups.map((g) => g.key || g.id).join(',') 
    }

    try {
      this.setIsUpdating(true)
      const { data } = await xhr.put(`/student_notes/${this.id}`, params)

      this.updateNoteOk(data)
    } catch (error) {
      this.noteStore.setIsError(getError(error))    
    } finally {
      runInAction(() => {
        this.setIsEditing(false)
        this.setIsUpdating(false)
      })
    }
  }

  @action updateNoteOk = (data) => {
    this.noteStore.originalNote.set(this.id, this)
    this.noteStore.notes.delete(this.id)
    this.updateFromJson(data)
    this.noteStore.notes.set(data.id, this)
    this.noteStore.setIsMessage({message: 'Note updated!', type: 'success'})
  }

  @action handleSelectTag = (e) => {
    this.tags = e
  }

  @action handleSelectGroup = (e) => {
    this.groups = e
  }

  shiftAfterDeletion = () => {
    const {orderedNotes} = this.noteStore
    const currentIndex = _.findIndex(orderedNotes, {'id': this.id})

    const nextIndex = currentIndex === (orderedNotes.length - 1) 
      ? (currentIndex - 1) 
      : (currentIndex + 1)

    if(nextIndex > -1 && nextIndex < orderedNotes.length) {
      this.noteStore.setSelectedNote(this.noteStore.orderedNotes[nextIndex])
    } else {
      this.noteStore.setSelectedNote(null)
    }
  }

  /* End Actions */
}