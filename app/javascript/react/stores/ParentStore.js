
import {
  observable,
  action
} from 'mobx'
import _          from 'lodash'
import { setter } from 'mobx-decorators'

import xhr        from 'helpers/xhr'
import uiStore    from 'stores/UiStore'

export class ParentStore {
  @observable currentStudentId = null

  @observable @setter isFetchingUser  = false
  @observable @setter isError         = false

  @action checkApproval = async(id) => {
    try {
      this.setIsFetchingUser(true)
      const { data } = await xhr.get(`/users/${id}`)

      return data
    } catch(err) {
      this.setIsError(true)
    } finally {
      this.setIsFetchingUser(false)
    }
  }

  @action fetchStudents = async(id) => {
    try {
      const { data } = await xhr.get(`/users/${id}/students`)
      
      if(!_.isEmpty(data)) {
        this.currentStudentId = data[0].id
      }
    } catch (err) {
      uiStore.addNotification({ title: 'Error', message: 'There was an error retrieving your student(s)!'})
    } 
  }
}

export default new ParentStore()