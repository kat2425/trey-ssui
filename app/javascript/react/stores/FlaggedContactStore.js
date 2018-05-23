import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import { setter }     from 'mobx-decorators'
import xhr            from 'helpers/XHR'
import getError       from 'helpers/ErrorParser'
import uiStore        from 'stores/UiStore'
import FlaggedContact from 'stores/models/FlaggedContact'

export class FlaggedContactStore {
  @observable contacts             = observable.map()

  @setter @observable isError      = false
  @setter @observable isLoading    = false

  @observable showFlagNotesModal   = false
  @observable selectedContact      = null
  @setter @observable searchFilter = ''

  @observable selectedRowKeys      = []
  @observable expandedRowKeys      = observable.map()


  constructor() {
    this.initAutoruns()
  }

  // Computed Values
  @computed get flaggedContacts() {
    return this.getFilteredContacts(this.contacts.values(), this.searchFilter)
  }

  @computed get hasContacts() {
    return this.contacts.size > 0
  }

  @computed get showEmptyContacts() {
    return !this.isLoading && !this.hasContacts
  }

  @computed get showTable() {
    return !this.isLoading 
  }

  @computed get dataSource(){
    return this.flaggedContacts.map(c => ({key: c.id, contact: c}))
  }

  @computed get hasSelected(){
    return this.selectedRowKeys.length > 0
  }

  getFilteredContacts = (contacts, filter) => {
    if(!filter) return contacts
    return contacts
      .filter( t => t.name .toLowerCase().indexOf(filter.toLowerCase()) > -1)
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action handleSearchFilter = (e) => {
    this.setSearchFilter(e.target.value)
  }

  @action fetchFlaggedContacts = async() => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      this.clearData()
      this.resetView()

      const response = await xhr.get('/contacts/flagged', {
        params: {
          only: [
            'id', 'student_id', 'name', 'phone', 'email', 'primary',
            'relationship', 'resides_with', 'checkout', 'emergency', 'no_contact',
            'stopped', 'student.full_name', 'avatar_url', 'flagged', 'flags_count', 'flags'
          ].join(',')
        }
      })

      this.fetchFlaggedContactsOK(response)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchFlaggedContactsOK = (response) => {
    response.data.forEach(this.createContact)
  }

  @action createContact = (json) => {
    this.contacts.set(json.id, new FlaggedContact(this, json))
  }

  @action updateContact = (json) => {
    const contact = this.contacts.get(json.id)

    contact && contact.updateFromJSON(json)
  }

  @action clearData = () => {
    this.contacts.clear()
  }


  @action toggleFlagNotesModal = () => {
    this.showFlagNotesModal = !this.showFlagNotesModal
  }

  @action setSelectedContact = (contact) => {
    const isInvalid = this.selectedContact === contact || !this.contacts.has(contact.id)

    if(isInvalid) return 

    this.selectedContact = contact
  }

  @action delete = (id) => {
    this.contacts.delete(id)
  }

  @action unFlagSelected = () => {
    this.selectedRowKeys.forEach(id => {
      const contact = this.contacts.get(id)

      contact && contact.unFlagNumber(false)
    })
  }

  @action onSelectChange = (selectedRowKeys = []) => {
    this.selectedRowKeys = selectedRowKeys
  }

  @action toggleViewNotes = contact => {
    this.expandedRowKeys.has(contact.id)
      ? this.expandedRowKeys.delete(contact.id)
      : this.expandedRowKeys.set(contact.id, contact.id)
  }

  handleOnUnflagSelectedContacts = () => {
    this.unFlagSelected()
    this.selectedRowKeys.clear()
  }

  resetView = () => {
    this.selectedRowKeys.clear()
    this.expandedRowKeys.clear()
  }
}

export default new FlaggedContactStore()
