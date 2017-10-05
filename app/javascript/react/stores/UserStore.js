import {observable} from 'mobx'
import {setter}     from 'mobx-decorators'
import xhr          from 'helpers/XHR'

class UserStore {
  @setter @observable user = null

  constructor(user){
    this.user = user
  }
}

const singleton = new UserStore()

export default singleton
