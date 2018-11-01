import {
  observable,
  action,
  autorun
} from 'mobx'

import { setter }   from 'mobx-decorators'

import xhr          from 'helpers/XHR'
import getError     from 'helpers/ErrorParser'

import uiStore      from 'stores/UiStore'
import { only }     from 'stores/PotentialUserStore'

export default class ParentValidation {
  parentStore                                      = null
  id                                               = null
  @setter @observable createdAt                    = null
  @setter @observable updatedAt                    = null
  @setter @observable firstName                    = null
  @setter @observable lastName                     = null
  @setter @observable email                        = null
  @setter @observable phone                        = null

  @setter @observable isError = false
  @setter @observable isEditing = false
  @setter @observable isDeleting = false

  constructor(store, json){
    this.parentStore = store
    this.update(json)
    this.initAutoruns()
  }

  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  autoErrorNotifier = () => {
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

  @action update = ({
    id,
    created_at: createdAt,
    updated_at: updatedAt,
    first_name: firstName,
    last_name:  lastName,
    email,
    phone
  }) => {
    this.id                           = id
    this.createdAt                    = createdAt
    this.updatedAt                    = updatedAt
    this.firstName                    = firstName
    this.lastName                     = lastName
    this.email                        = email
    this.phone                        = phone
  }

  @action edit = async() => {
    try {
      this.setIsEditing(true)
      this.setIsError(false)

      const { data } = await xhr.put(`/potential_users/${this.id}`, {
        params: { only }
      })

      this.editOk(data)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsEditing(false)
    }
  }

  @action editOk = (data) => {
    uiStore.addNotification({
      title:   'Success',
      message: `${this.firstName} ${this.lastName} has been edited`,
      type:    'success'
    })
    this.update(data)
  }

  @action delete = async() => {
    try {
      this.setIsDeleting(true)
      this.setIsError(false)

      await xhr.delete(`/potential_users/${this.id}`, {
        params: { only }
      })

      this.deleteOk()
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsDeleting(false)
    }
  }

  @action deleteOk = () => {
    uiStore.addNotification({
      title:   'Success',
      message: `${this.firstName} ${this.lastName} has been deleted`,
      type:    'success'
    })
    this.parentStore.deletePotentialUser(this.id)
  }
}
