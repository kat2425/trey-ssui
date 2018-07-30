import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'

import PotentialUser        from 'stores/models/PotentialUser'
import getError             from 'helpers/ErrorParser'
import uiStore              from 'stores/UiStore'
import Pagination           from 'stores/models/Pagination'

import {
  orderBy,
  groupBy,
  isEmpty
} from 'lodash/fp'

import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

export const only = [
  'id',
  'first_name',
  'last_name',
  'created_at',
  'updated_at',
  'email',
  'phone'
].join(',')


export const STATUS = {
  ALL:      'all',
  PENDING:  'pending',
  REJECTED: 'rejected',
  VERIFIED: 'verified',
  SKIPPED:  'skipped'
}

export const MODE = {
  INVITED:  'invited',
  ACCEPTED: 'accepted'
}

export class ParentValidationStore {
  @setter @observable isLoading                 = false
  @setter @observable isError                   = null
  @observable validations                       = observable.map()
  @setter @observable selectedParentValidation  = null
  @setter @observable filter                    = ''
  @setter @observable status                    = STATUS.ALL
  @setter @observable mode                      = MODE.INVITED
  @observable pagination                        = new Pagination(this)

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

  @computed get skippedValidations(){
    return groupBy(v => v.validationStatus)(this.validations.values()).skipped
  }

  @computed get visibleValidations(){
    if(this.status === STATUS.REJECTED) return this.rejectedValidations
    if(this.status === STATUS.PENDING)  return this.pendingValidations
    if(this.status === STATUS.VERIFIED) return this.verifiedValidations
    if(this.status === STATUS.SKIPPED)  return this.skippedValidations
    return this.descValidations
  }

  @computed get dataSource(){
    const validations = this.visibleValidations

    return !isEmpty(validations) ? validations.map(v => ({key: v.id, validation: v})) : []
  }

  @computed get showTable() {
    return !this.isLoading
  }

  @computed get paginationParams(){
    return {
      page:  this.pagination.current,
      limit: this.pagination.pageSize
    }
  }

  @computed get showPagination(){
    return (
      isEmpty(this.filter) &&
      !this.isLoading &&
      this.pagination.limit > 0 &&
      this.pagination.page > 0 &&
      this.validations.size > 0
    )
  }

  @action setPagination = ({total}) => {
    this.pagination.setTotal(parseInt(total))
    this.pagination.calculateTotalResults()
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
       const params = {
         params: {
           only,
           ...this.paginationParams
         }
       }

       if(this.status !== STATUS.ALL) params.params.status = this.status

       this.setIsLoading(true)
       this.setIsError(null)

       const { headers, data } = await xhr.get('/potential_users', params)

       this.fetchParentValidationsOk(headers, data)
     } catch (err) {
       this.setIsError(getError(err))
     } finally {
       this.setIsLoading(false)
     }
   }

   @action fetchParentValidationsOk = (headers, validations) => {
     this.setPagination(headers)
     this.validations.clear()
     validations.forEach(this.createValidation)
   }

   @action createValidation = validation => {
     if(this.validations.has(validation.id)) return

     this.validations.set(validation.id, new PotentialUser(this, validation))
   }

   @action handleContactSearch = async(filter) => {
     this.filter = filter
     try {
       const params = {
         params: {
           query: filter,
           only:  only
         }
       }

       if (this.status !== STATUS.ALL) params.params.status = this.status

       this.setIsError(null)

       const { data } = await xhr.get('parent_user_validations/search', params)

       this.handleContactSearchOk(data)
     } catch (err) {
       this.setIsError(getError(err))
     }
   }

   @action handleContactSearchOk = (data) => {
     this.validations.clear()
     data.forEach(this.createValidation)
   }

   @action onPageChange = () => {
     this.fetchParentValidations()
   }

   @action handleFilterChange = ({target}) => {
     this.pagination.clear()
     this.setStatus(STATUS[target.value.toUpperCase()])
     this.fetchParentValidations()
   }

   @action handleModeChange = ({target}) => {
     this.pagination.clear()
     this.setMode(MODE[target.value.split(' ')[0].toUpperCase()])
     this.fetchParentValidations()
   }

   @action deleteValidation = id => {
     this.validations.delete(id)
   }
}

export default new ParentValidationStore()
