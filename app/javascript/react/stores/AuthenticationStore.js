import axios       from 'axios'
import {setter}    from 'mobx-decorators'
import _           from 'lodash'
import queryString from 'query-string'

import { 
  observable,
  computed,
  action
} from 'mobx'

const FAILED_AUTH_MAX = 3

export class AuthenticationStore {
  @observable authFailureCount    = 0
  @setter @observable isLoggingIn = false
  @setter @observable isError     = null

  @computed get showFailedAuth(){
    return this.authFailureCount === FAILED_AUTH_MAX
  }

  @computed get showError() {
    return _.has(this.isError, 'message')
  }
  @computed get errorTitle() {
    return _.get(this.isError, 'title', 'Error Authenticating User')
  }

  @computed get errorMessage() {
    return _.get(this.isError, 'message', '')
  }
  
  @action login = async(data, event, callback) => {
    try {
      this.setIsLoggingIn(true)
      this.setIsError(false)

      const res =  await axios.post('/login', getFormData(data, event), {
        'Content-Type': 'multipart/form-data'
      })

      this.loginOK(res, callback)
    } catch(e){
      console.error(e)

      ++this.authFailureCount
      const title = 'Incorrect email or password'
      const message = 'If you think this is a mistake, please contact your principal or district office.'

      this.setIsError({ message, title})
      callback(false)
    } finally {
      this.setIsLoggingIn(false)
    }
  }


  @action loginOK = (res, callback) => {
    this.clearFailureAuthCount()
    callback(true)    
  }

  @action clearFailureAuthCount(){
    this.authFailureCount = 0
  }

  @action checkForFailedGoogleAuth(search){
    const params = queryString.parse(search)

    if(params.auth === 'nouser'){
      const title = 'Google authentication failed'
      const message = [`We're not showing ${params.username} as a valid account in our`,
        'records. If you think this is a mistake, please contact your principal',
        'or district office.']
        .join(' ')

      this.setIsError({message, title})
    }
  }
}

function getFormData({userName, password}, event){
  const data = new FormData(event.target)

  data.append('username', userName)
  data.append('password', password)

  return data
}

export default new AuthenticationStore()
