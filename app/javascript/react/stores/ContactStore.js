import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import getError   from 'helpers/ErrorParser'
import uiStore    from 'stores/UiStore'
import _          from 'lodash'
import Contact    from 'stores/models/Contact'

export const VIEWS = {
  TABLE: 'TABLE',
  GRID:  'GRID'
}

export const FILTERS = {
  ALL:     'ALL',
  PRIMARY: 'PRIMARY',
  FLAGGED: 'FLAGGED'
}

export class ContactStore {
  @observable contacts             = observable.map()
  @observable flaggedContacts      = observable.map()

  @setter @observable isError      = false
  @setter @observable isLoading    = false

  @observable showFlagFormModal    = false
  @observable showFlagNotesModal   = false
  @observable selectedContact      = null
  @setter @observable selectedView = VIEWS.GRID
  @setter @observable searchFilter = ''
  @setter @observable filter       = FILTERS.ALL


  constructor() {
    this.initAutoruns()
  }

  // Computed Values
  @computed get showTableView(){
    return this.selectedView === VIEWS.TABLE
  }

  @computed get showGridView(){
    return this.selectedView === VIEWS.GRID
  }

  @computed get groupedContacts() {
    let contacts = this.getFilteredContactsByProp(this.contacts.values(), this.filter)

    contacts = this.getFilteredContacts(contacts, this.searchFilter)

    return this.getGroupedContacts(contacts)
  }

  @computed get hasContacts() {
    return this.contacts.size > 0
  }

  @computed get showEmptyContacts() {
    return !this.isLoading && !this.hasContacts
  }

  getFilteredContactsByProp = (contacts, filter) => {
    switch(filter){
    case FILTERS.ALL:
      return contacts
    case FILTERS.FLAGGED:
      return contacts.filter(c => c.flagged)
    case FILTERS.PRIMARY:
      return contacts.filter(c => c.primary)
    default:
      return contacts
    }
  }

  getFilteredContacts = (contacts, filter) => {
    if(!filter) return contacts
    return contacts
      .filter( t => t.name .toLowerCase().indexOf(filter.toLowerCase()) > -1)
  }

  getGroupedContacts = (contacts) => {
    return _.map(
      _.groupBy(contacts, c => [c.name, c.relationship]),
      group => ({
        name:         group[0].name,
        relationship: group[0].relationship,
        refs:         _.map(group, (g, i) => _.merge(g, { index: i }))
      })
    )
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

  @action handleOnFilterChange = (e) => {
    this.setFilter(e.target.value)
  }

  @action fetchStudentContacts = async(id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      this.clearData()

      const response = await xhr.get(`/students/${id}/contacts`, {
        params: {
          only: [
            'id', 'student_id', 'name', 'phone', 'email', 'primary',
            'relationship', 'resides_with', 'checkout', 'emergency', 'no_contact',
            'stopped', 'student.full_name', 'avatar_url', 'flagged', 'flags_count', 'flags'
          ].join(',')
        }
      })

      this.fetchStudentContactsOK(response)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchStudentContactsOK = (response) => {
    response.data.forEach(this.createContact)
  }

  @action createContact = (json) => {
    this.contacts.set(json.id, new Contact(this, json))
  }

  @action updateContact = (json) => {
    const contact = this.contacts.get(json.id)

    contact && contact.updateFromJSON(json)
  }

  @action clearData = () => {
    this.contacts.clear()
  }

  @action toggleFlagFormModal = () => {
    this.showFlagFormModal = !this.showFlagFormModal
  }

  @action toggleFlagNotesModal = () => {
    this.showFlagNotesModal = !this.showFlagNotesModal
  }

  @action setSelectedContact = (contact) => {
    const isInvalid = this.selectedContact === contact || !this.contacts.has(contact.id)

    if(isInvalid) return 

    this.selectedContact = contact
  }

  @action handleOnChangeView = (e) => {
    this.setSelectedView(e.target.value)
  }

  @action resetView = () => {
    this.setFilter(FILTERS.ALL)
    this.setSelectedView(VIEWS.GRID)
  }
}

export default new ContactStore()
