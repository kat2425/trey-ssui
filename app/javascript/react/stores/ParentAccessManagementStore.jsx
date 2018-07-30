import _          from 'lodash'
import getError   from 'helpers/ErrorParser'
import uiStore    from 'stores/UiStore'
import xhr        from 'helpers/XHR'
import { setter } from 'mobx-decorators'
import {
  action,
  autorun,
  computed,
  observable
} from 'mobx'


export const MODAL = {
  EDIT:   'edit',
  INVITE: 'invite',
  NONE:   false
}

class ParentAccessManagementStore {
  @setter @observable contacts     = []
  @setter @observable isCreating   = false
  @setter @observable isError      = null
  @setter @observable isFetching   = false
  @setter @observable isEditing    = false
  @setter @observable showModal    = MODAL.NONE

  constructor() {
    this.initAutoruns()
  }

  // Computed
  @computed get orderedContacts() {
    if (!_.isEmpty(this.contacts)) { 
      return _.orderBy(this.contacts, c => c.name, 'asc')
    }
  }

  // Actions
  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          message: this.isError.message,
          title:   this.isError.title,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action createParent = async(values, clear) => {
    const params = {
      first_name: values.firstName,
      last_name:  values.lastName,
      email:      values.email,
      phone:      values.phone,
      user_type:  'parent'
    }

    try {
      this.setIsCreating(true)
      this.setIsError(false)
      await xhr.post('/potential_users', params)
      clear()
      uiStore.addMessage('User Added')
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsCreating(false)
    }
  }

  @action editParent = async(values, clear) => {
    const params = {
      first_name: values.firstName,
      last_name:  values.lastName,
      email:      values.email,
      phone:      values.phone,
      user_type:  'parent'
    }

    try {
      this.setIsEditing(true)
      this.setIsError(false)
      await xhr.put('/potential_users', params)
      clear()
      uiStore.addMessage('User Added')
      this.setShowModal(MODAL.NONE)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsEditing(false)
    }
  }

  @action handleContactSearch = async(searchFilter) => {
    const params = {
      params: {
        query: searchFilter,
        only:  'id,name,email,phone'
      }
    }

    this.contacts.clear()
    this.setIsFetching(true)
    this.setIsError(false)
    try {
      const response = await xhr.get('/contacts/search', params)
      const contacts = response.data
        .filter(contact => !_.isEmpty(contact))
        .map(contact => {
          if (contact.name.includes(', ')){
            contact.name = _.reverse(contact.name.split(', ')).join(' ')
          }
          return {
            name:  contact.name,
            email: contact.email,
            phone: contact.phone,
            id:    contact.id
          }
        })

      this.setContacts(contacts)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsFetching(false)
    }
  }
}

export default new ParentAccessManagementStore()
