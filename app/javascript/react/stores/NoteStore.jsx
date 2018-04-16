import { 
  action, 
  autorun,
  computed, 
  observable, 
  runInAction
} from 'mobx'

import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import _          from 'lodash'
import Note       from 'stores/models/Note'
import Pagination from 'stores/models/Pagination'
import uiStore    from 'stores/UiStore'
import uuid       from 'uuid'
import getError   from 'helpers/ErrorParser'

class NoteStore {
  @observable notes                    = observable.map()
  @observable tags                     = []
  @observable originalNote             = observable.map()
  @observable selectedNote             = null
  @observable noteFilter               = null
  @observable pagination               = new Pagination(this)
  @setter @observable isLoading        = false
  @setter @observable studentID        = null
  @setter @observable isSelectingGroup = false
  @setter @observable isMessage        = null
  @setter @observable isError          = null
  
  constructor() {
    this.initAutoruns()
  }

  /* Computed */

  @computed get orderedNotes() {
    const orderedNotes = _.orderBy(this.notes.values(), t => t.updatedAt || t.createdAt, 'desc')

    if(!this.noteFilter) return orderedNotes

    return orderedNotes.filter(t => getFilterConditions(t.title, t.body, this.noteFilter))
  }

  /* End Computed */

  /* Actions */

  @action initAutoruns = () => {   
    this.autoMessager()
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    'error'
        })
      }
    })
  }

  @action autoMessager = () => {
    this.autoMessage = autorun('auto notify user', () => {
      if(this.isMessage) {
        uiStore.addMessage(this.isMessage.message, this.isMessage.type)
        this.setIsMessage(null)
      }
    })
  }

  @action handleOnCreateClick = () => {    
    this.addNote(new Note({isNew: true}, this, {id: uuid(), title: 'Untitled Note', body: ''}))
  }

  @action
  fetchStudentNotes = async() => {
    try {
      this.setIsLoading(true)
      this.selectedNote = null
      
      const params = {
        params: {
          student_id: this.studentID, 
          only:       [ 
            'id', 
            'title', 
            'body', 
            'groups.id', 
            'tag_ids',
            'global', 
            'student_note_tags.id', 
            'student_note_tags.name', 
            'groups.group_name',
            'created_at',
            'updated_at',
            'user.full_name'
          ].join(','),
          page:  this.pagination.current,
          limit: this.pagination.pageSize
        }
      }
      
      const { headers, data } = await xhr.get('/student_notes', params) 

      runInAction(() => {
        this.setPagination(headers)
        this.fetchStudentNotesOk(data)
        this.pagination.calculateTotalResults()
      })
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchStudentNotesOk = (data) => {
    data.forEach(this.updateNoteFromServer)
    if (this.orderedNotes && _.isNil(this.selectedNote)) {
      this.setSelectedNote(this.orderedNotes[0])   
    }
  }

  @action fetchNoteTags = async() => {
    try{
      const { data } = await xhr.get('/student_note_tags')

      this.tags = data
    } catch (err) {
      this.setIsError(getError(err))
    }
  }

  @action addNote = note => {
    if(this.notes.has(note.id)) return
    this.notes.set(note.id, note)
  }

  @action editBodyOnChange = event => {
    this.selectedNote.body = event.target.value
  }

  @action editTitleOnChange = event => {
    this.selectedNote.setIsDefaultTitle(false)
    this.selectedNote.title = event.target.value
  }

  @action handleNoteFilter = ({target}) => {
    this.noteFilter = target.value
  }

  @action setSelectedNote = (note) => { 
    this.selectedNote = note
    this.isEditing && this.setIsEditing(false)
  }

  @action updateNoteFromServer = note => {
    this.addNote(new Note({}, this, note))
  }

  @action setPagination = ({total}) => {
    this.pagination.setTotal(parseInt(total))
  }

  @action onPageChange = () => {
    this.fetchStudentNotes()
  }
}

function getFilterConditions(a, b, c) {
  return (
    a.toLowerCase().indexOf(c.toLowerCase()) > -1 ||
    b.toLowerCase().indexOf(c.toLowerCase()) > -1
  )
}

export default new NoteStore()
