import {
  observable,
  action,
  autorun
} from 'mobx'

import { setter }   from 'mobx-decorators'


import xhr          from 'helpers/XHR'
import fireEvent    from 'helpers/FireEvent'
import getError     from 'helpers/ErrorParser'

import uiStore      from 'stores/UiStore'
import { only }     from 'stores/ParentUserStore'

export default class Validation {
  id                                               = null
  @setter @observable contact                      = null
  @setter @observable student                      = null
  @setter @observable createdAt                    = null
  @setter @observable updatedAt                    = null
  @setter @observable validationStatus             = null
  @setter @observable addressCorrect               = null
  @setter @observable dateOfBirthCorrect           = null
  @setter @observable addressQuestionAttempted     = null
  @setter @observable dateOfBirthQuestionAttempted = null

  @setter @observable isError               = false
  @setter @observable isRejecting           = false
  @setter @observable isVerifying           = false

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
    contact,
    updated_at: updatedAt,
    created_at: createdAt,
    address_question_attempted: addressQuestionAttempted,
    date_of_birth_question_attempted: dateOfBirthQuestionAttempted,
    validation_status: validationStatus
  }) => {
    this.id               = id
    this.contact          = contact
    this.student          = contact.student
    this.createdAt        = createdAt
    this.updatedAt        = updatedAt
    this.validationStatus = validationStatus
    this.dateOfBirthQuestionAttempted = dateOfBirthQuestionAttempted
    this.addressQuestionAttempted = addressQuestionAttempted
  }

  @action verify = async() => {
    try {
      this.setIsVerifying(true)
      this.setIsError(false)

      const { data } = await xhr.put(`/parent_user_validations/${this.id}/approve`, {
        params: { only }
      })

      this.verifyOk(data)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsVerifying(false)
    }
  }

  @action verifyOk = (data) => {
    this.update(data)
    uiStore.addNotification({
      title:   'Success',
      message: `${this.student.full_name} has been approved`,
      type:    'success'
    })
  }

  @action reject = async() => {
    try {
      this.setIsRejecting(true)
      this.setIsError(false)

      const { data } = await xhr.put(`/parent_user_validations/${this.id}/reject`, {
        params: { only }
      })

      this.rejectOk(data)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsRejecting(false)
    }
  }

  @action rejectOk = (data) => {
    this.update(data)
    uiStore.addNotification({
      title:   'Success',
      message: `${this.student.full_name} has been rejected`,
      type:    'success'
    })
  }

  @action openStudentCard = () => {
    fireEvent('showStudentCard', {student: this.contact.student.id})
  }
}
