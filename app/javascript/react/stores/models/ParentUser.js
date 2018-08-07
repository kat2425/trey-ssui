import {
  observable,
  computed,
  action,
  autorun
} from 'mobx'

import { setter }   from 'mobx-decorators'

import _            from 'lodash'

import uiStore      from 'stores/UiStore'
import Validation   from './Validation'

export default class ParentUser {
  parentStore  = null
  id           = null
  username     = null
  mobileNumber = null
  fullName     = null

  @setter @observable validations = observable.map()
  @setter @observable isError     = false
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

  @computed get dataSource(){
    return _.orderBy(
      this.validations.values(),
      v => v.updatedAt || v.createdAt,
      'desc'
    ).map(v => ({ validation: v, key: v.id }))
  }

  @action update = ({
    id,
    full_name: fullName,
    parent_user_validations: parentUserValidations,
    username,
    mobile_number: mobileNumber
  }) => {
    this.id                           = id
    this.fullName                     = fullName
    this.username                     = username
    this.mobileNumber                 = mobileNumber
    parentUserValidations.forEach(this.createValidation)
  }

  @action createValidation = validation => {
    if(this.validations.has(validation.id)) return

    this.validations.set(validation.id, new Validation(this, validation))
  }
}
