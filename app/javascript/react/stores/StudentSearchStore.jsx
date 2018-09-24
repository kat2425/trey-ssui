import {
  observable,
  action
} from 'mobx'
import { setter }           from 'mobx-decorators'
import getError             from 'helpers/ErrorParser'
import xhr                  from 'helpers/XHR'

export class StudentSearchStore {
  @observable @setter students  = []
  @observable @setter isLoading = false
  @observable @setter isError   = false

  @action
  lookupStudent = async(val) => {
    try {
      if (val.length >= 3) {
        this.setIsLoading(true)
        const res = await xhr.get('/typeahead/students', {
          params: { text_filter: val }
        })

        this.setStudents(res.data)
      }
    }
    catch(e) {
      this.setIsError(getError(e))
    }
    finally {
      this.setIsLoading(false)
    }
  }
}

export default new StudentSearchStore()