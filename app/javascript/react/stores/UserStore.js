import {observable} from 'mobx'
import {setter}     from 'mobx-decorators'
import xhr          from 'helpers/XHR'

class UserStore {
  @observable hasChannel   = false
  @setter @observable user = null

  constructor(user){
    this.user = user
    this.checkHasChannel()
  }

  checkHasChannel = async() => {
    const { data } = await xhr.get('/users/self?only=has_channel')

    this.hasChannel = data.has_channel
  }
}

const singleton = new UserStore()

export default singleton
