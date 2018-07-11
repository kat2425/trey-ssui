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
import { only }     from 'stores/ParentValidationsStore'

export default class ParentValidation {
  parentStore                                      = null
  id                                               = null
  @setter @observable user                         = null
  @setter @observable contact                      = null
  @setter @observable student                      = null
  @setter @observable createdAt                    = null
  @setter @observable updatedAt                    = null
  @setter @observable validationStatus             = null
  @setter @observable addressCorrect               = null
  @setter @observable dateOfBirthCorrect           = null
  @setter @observable addressQuestionAttempted     = null
  @setter @observable dateOfBirthQuestionAttempted = null

  @setter @observable isError = false
  @setter @observable isRejecting = false
  @setter @observable isVerifying = false

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
    user,
    contact,
    created_at: createdAt,
    updated_at: updatedAt,
    validation_status: validationStatus,
    address_correct: addressCorrect,
    date_of_birth_correct: dateOfBirthCorrect,
    address_question_attempted: addressQuestionAttempted,
    date_of_birth_question_attempted: dateOfBirthQuestionAttempted
  }) => {
    this.id                           = id
    this.user                         = user
    this.contact                      = contact
    this.student                      = contact.student
    this.createdAt                    = createdAt
    this.updatedAt                    = updatedAt
    this.validationStatus             = validationStatus
    this.addressCorrect               = addressCorrect
    this.dateOfBirthCorrect           = dateOfBirthCorrect
    this.addressQuestionAttempted     = addressQuestionAttempted
    this.dateOfBirthQuestionAttempted = dateOfBirthQuestionAttempted
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
    uiStore.addNotification({
      title:   'Success',
      message: `${this.user.full_name} has been approved`,
      type:    'success'
    })
    this.update(data)
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
    uiStore.addNotification({
      title:   'Success',
      message: `${this.user.full_name} has been rejected`,
      type:    'success'
    })
    this.update(data)
  }

  @action openStudentCard = () => {
    fireEvent('showStudentCard', {student: this.contact.student.id})
  }
}
