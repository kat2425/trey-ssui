import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'

import ParentValidation     from 'stores/models/ParentValidation'
import getError             from 'helpers/ErrorParser'
import uiStore              from 'stores/UiStore'

import {
  orderBy,
  groupBy
} from 'lodash/fp'

import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

export const only = [
  'id',
  'user.full_name',
  'user.username',
  'user.mobile_number',
  'user.user_type',
  'user.district_id',
  'contact.relationship',
  'contact.student.id',
  'contact.student.full_name',
  'created_at',
  'updated_at',
  'validation_status',
  'address_correct',
  'date_of_birth_correct',
  'address_question_attempted',
  'date_of_birth_question_attempted'
].join(',')


export class ParentValidationStore {
  @setter @observable isLoading                 = false
  @setter @observable isError                   = null
  @setter @observable searchFilter              = ''
  @observable validations                       = observable.map()
  @setter @observable selectedParentValidation  = null
  @setter @observable filter                    = 'all'

  constructor() {
    this.initAutoruns()
  }

  @computed get descValidations(){
    return orderBy(v => v.updatedAt || v.createdAt, 'desc')(this.validations.values())
  }

  @computed get rejectedValidations(){
    return groupBy(v => v.validationStatus)(this.validations.values()).rejected
  }

  @computed get verifiedValidations(){
    return groupBy(v => v.validationStatus)(this.validations.values()).verified
  }

  @computed get pendingValidations(){
    return groupBy(v => v.validationStatus)(this.validations.values()).pending
  }

  getFilteredValidations = (validations, filter) => {
    if(!filter) return validations

    return validations.filter(
      v => v.user.full_name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  }

  @computed get visibleValidations(){
    if(this.filter === 'rejected') return this.rejectedValidations
    if(this.filter === 'pending')   return this.pendingValidations
    if(this.filter === 'verified') return this.verifiedValidations
    return this.descValidations
  }

  @computed get dataSource(){
    const filteredValidations = this.getFilteredValidations(this.visibleValidations, this.searchFilter)

    return filteredValidations && filteredValidations.map(v => ({key: v.id, validation: v}))
  }

  @computed get showTable() {
    return !this.isLoading
  }

  @action
   initAutoruns = () => {
     this.autoErrorNotifier()
   }

   @action
   autoErrorNotifier = () => {
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

   @action clearData = () => {
     this.validations.clear()
   }


   @action fetchParentValidations = async() => {
     try {
       this.setIsLoading(true)
       this.setIsError(null)

       const { data } = await xhr.get('parent_user_validations', {
         params: { only }
       })

       this.fetchParentValidationsOk(data)
     } catch (err) {
       this.setIsError(getError(err))
     } finally {
       this.setIsLoading(false)
     }
   }

   @action fetchParentValidationsOk = validations => {
     validations.forEach(this.createValidation)
   }

   @action createValidation = validation => {
     if(this.validations.has(validation.id)) return

     this.validations.set(validation.id, new ParentValidation(this, validation))
   }

   @action handleSearchFilter = (e) => {
     this.setSearchFilter(e.target.value)
   }
}

export default new ParentValidationStore()
