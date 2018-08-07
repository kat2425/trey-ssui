import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'

import PotentialUser        from 'stores/models/PotentialUser'
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
  'created_at',
  'updated_at',
  'email',
  'phone'
].join(',')

export class PotentialUserStore {
  @setter @observable isLoading                 = false
  @setter @observable isError                   = null
  @observable potentialUsers                    = observable.map()
  @setter @observable selectedPotentialUser     = null
  @setter @observable filter                    = ''
  @observable pagination                        = new Pagination(this)

  constructor() {
    this.initAutoruns()
  }

  @computed get dataSource(){
    const potentialUsers = orderBy(v => v.updatedAt || v.createdAt, 'desc')(this.potentialUsers.values())

    return !isEmpty(potentialUsers) ? potentialUsers.map(v => ({key: v.id, potentialUser: v})) : []
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
      this.potentialUsers.size > 0
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
     this.potentialUsers.clear()
   }


   @action fetchPotentialUsers = async() => {
     try {
       const params = {
         params: {
           only,
           ...this.paginationParams
         }
       }

       this.setIsLoading(true)
       this.setIsError(false)

       const { headers, data } = await xhr.get('/potential_users', params)

       this.fetchPotentialUsersOk(headers, data)
     } catch (err) {
       this.setIsError(getError(err))
     } finally {
       this.setIsLoading(false)
     }
   }

   @action fetchPotentialUsersOk = (headers, potentialUsers) => {
     this.setPagination(headers)
     this.potentialUsers.clear()
     potentialUsers.forEach(this.createPotentialUser)
   }

   @action createPotentialUser = potentialUser => {
     if(this.potentialUsers.has(potentialUser.id)) return

     this.potentialUsers.set(potentialUser.id, new PotentialUser(this, potentialUser))
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

       this.setIsError(false)

       const { data } = await xhr.get('potential_users/search', params)

       this.handleContactSearchOk(data)
     } catch (err) {
       this.setIsError(getError(err))
     }
   }

   @action handleContactSearchOk = (data) => {
     this.potentialUsers.clear()
     data.forEach(this.createValidation)
   }

   @action onPageChange = () => {
     this.fetchPotentialUsers()
   }

   @action deletePotentialUser = id => {
     this.potentialUsers.delete(id)
   }
}

export default new PotentialUserStore()
