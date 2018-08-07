import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'

import ParentUser           from 'stores/models/ParentUser'
import getError             from 'helpers/ErrorParser'
import uiStore              from 'stores/UiStore'
import Pagination           from 'stores/models/Pagination'

import {
  orderBy,
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
  'full_name',
  'username',
  'mobile_number',
  'user_type',
  'district_id',
  'parent_user_validations.id',
  'parent_user_validations.created_at',
  'parent_user_validations.updated_at',
  'parent_user_validations.validation_status',
  'parent_user_validations.address_correct',
  'parent_user_validations.date_of_birth_correct',
  'parent_user_validations.address_question_attempted',
  'parent_user_validations.date_of_birth_question_attempted',
  'parent_user_validations.contact.relationship',
  'parent_user_validations.contact.student.id',
  'parent_user_validations.contact.student.full_name'
].join(',')

export class ParentUserStore {
  @setter @observable isLoading                 = false
  @setter @observable isError                   = null
  @observable parentUsers                       = observable.map()
  @observable expandedRowKeys                   = observable.map()
  @setter @observable selectedParentUsers       = null
  @setter @observable filter                    = ''
  @observable pagination                        = new Pagination(this)

  constructor() {
    this.initAutoruns()
  }

  @computed get dataSource(){
    const parentUsers = orderBy(v => v.updatedAt || v.createdAt, 'desc')(this.parentUsers.values())

    return !isEmpty(parentUsers) ? parentUsers.map(v => ({key: v.id, parentUser: v})) : []
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
      this.parentUserss.size > 0
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
     this.parentUsers.clear()
   }

   @action fetchParentUsers = async() => {
     try {
       const params = {
         params: {
           only,
           ...this.paginationParams
         }
       }

       this.setIsLoading(true)
       this.setIsError(false)

       const { headers, data } = await xhr.get('users/parents', params)

       this.fetchParentUsersOk(headers, data)
     } catch (err) {
       this.setIsError(getError(err))
     } finally {
       this.setIsLoading(false)
     }
   }

   @action fetchParentUsersOk = (headers, parentUsers) => {
     this.setPagination(headers)
     this.parentUsers.clear()
     parentUsers.forEach(this.createValidation)
   }

   @action createValidation = parentUsers => {
     if(this.parentUsers.has(parentUsers.id)) return

     this.parentUsers.set(parentUsers.id, new ParentUser(this, parentUsers))
   }

   @action handleContactSearch = async(filter) => {
     this.filter = filter
     try {
       const params = {
         params: {
           query:     filter,
           user_type: 'parents',
           only:      only
         }
       }

       this.setIsError(false)

       const { data } = await xhr.get('users/es_search', params)

       this.handleContactSearchOk(data)
     } catch (err) {
       this.setIsError(getError(err))
     }
   }

   @action handleContactSearchOk = (data) => {
     this.parentUsers.clear()
     data.forEach(this.createValidation)
   }

   @action onPageChange = () => {
     this.fetchParentUsers()
   }

   @action toggleViewValidations = parentUser => {
     this.expandedRowKeys.has(parentUser.id)
       ? this.expandedRowKeys.clear()
       : this.expandedRowKeys.set(parentUser.id, parentUser.id)
   }
}

export default new ParentUserStore()
