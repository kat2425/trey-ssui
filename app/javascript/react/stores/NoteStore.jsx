import { 
  action, 
  autorun,
  computed, 
  observable, 
  runInAction
} from 'mobx'

import { setter }       from 'mobx-decorators'
import xhr              from 'helpers/XHR'
import _                from 'lodash'
import Note             from 'stores/models/Note'
import Pagination       from 'stores/models/Pagination'
import uiStore          from 'stores/UiStore'
import uuid             from 'uuid'
import getError         from 'helpers/ErrorParser'
import DateFormat       from 'helpers/DateFormat'
import studentCardStore from 'stores/StudentCardStore'

class NoteStore {
  printWindow                          = null
  @observable notes                    = observable.map()
  @observable tags                     = []
  @observable originalNote             = observable.map()
  @observable selectedNote             = null
  @observable noteFilter               = null
  @observable pagination               = new Pagination(this)
  @setter @observable isLoading        = false
  @setter @observable isPrinting       = false
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

  @action handleOnPrint = (single = false) => {
    if(single === true) {
      const printableNote = [this.selectedNote]
       
      this.printNotes(printableNote)
    } else {
      this.fetchStudentNotes(true)
    }
  }

  @action
  fetchStudentNotes = async(print = false) => {
    try {
      this.setIsLoading(true)
      this.setIsPrinting(print)

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
            'user.full_name',
            'modifiable'
          ].join(','),
          page:  this.pagination.current,
          limit: print ? this.pagination.total : this.pagination.pageSize
        }
      }
      
      const { headers, data } = await xhr.get('/student_notes', params) 

      this.fetchStudentNotesOk(headers, data, print)
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      runInAction(() => {
        this.setIsLoading(false)
        this.setIsPrinting(false)
      })   
    }
  }

  @action fetchStudentNotesOk = (headers, data, print = false) => {
    this.setPagination(headers)
    data.forEach(this.updateNoteFromServer)
    if (this.orderedNotes && _.isNil(this.selectedNote)) {
      this.setSelectedNote(this.orderedNotes[0])   
    }
    this.pagination.calculateTotalResults()

    if(print) {
      this.printNotes(data)
    }
  }

  @action printNotes = (data) => {
    this.initPrintWindow()

    if(_.isEmpty(this.printWindow)) { 
      this.setIsError({
        title:   'Printing Error', 
        message: 'You may need to allow pop-ups from our application!'
      })

      return
    }

    this.printWindow.document.body.innerHTML = 
      `<div style='font-family: sans-serif;'>
        ${showPrintHeader()}    
        ${getElements(data)}
      </div>`
        
    this.printWindow.print()  
  }

  initPrintWindow = () => {
    this.printWindow = window.open('')
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
    this.setSelectedBody(event.target.value)
  }

  @action editTitleOnChange = event => {
    this.selectedNote.setIsDefaultTitle(false)
    this.selectedNote.title = event.target.value
  }

  @action setSelectedBody = body => {
    this.selectedNote.body = body
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

  @action clear = () => {
    this.notes.clear()
    this.pagination.clear()
    this.selectedNote = null
  }

  @action resetNotes = (studentID) => {
    this.clear()
    this.setStudentID(studentID)
    this.fetchStudentNotes()
    this.fetchNoteTags()
  }
}

function getFilterConditions(a, b, c) {
  return (
    a.toLowerCase().indexOf(c.toLowerCase()) > -1 ||
    b.toLowerCase().indexOf(c.toLowerCase()) > -1
  )
}

function showPrintHeader() { 
  const studentName = `<p style='margin: 15px 0px;'>Student: ${studentCardStore.student.full_name}</p>`
   
  return (
    `<header style='background-color: #142636; padding:5px; -webkit-print-color-adjust: exact;'>
      <img 
        style='height:50px;' 
        src="https://secure.schoolstatus.com/images/navbar-logo-schoolstatus-circle.svg"/>
    </header>
    ${studentName}`
  )
}

function getElements(data) {
  const elements = []

  data.forEach((e) => { 
    const createdAt = DateFormat.shortDateTime(e.created_at || e.createdAt)

    elements.push(
      `<p style='color:darkgray; margin-bottom: 0px;'>
        <small>${createdAt}</small>
      </p>`
    )
    elements.push(
      `<h2 style='margin:5px 0px 5px 0px;'>${e.title}</h2>`
    )
    elements.push(`<p>${e.body}</p>`)

    data.length > 1 && elements.push('<hr style="margin-bottom:10px;">')
  })

  return elements.join('')
}

export default new NoteStore()
