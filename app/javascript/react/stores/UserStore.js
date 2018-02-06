import {
  observable,
  action,
  computed
} from 'mobx'

import { every, includes } from 'lodash'
import {setter}            from 'mobx-decorators'

class UserStore {
  @setter @observable user = null

  constructor(user){
    this.user = user
  }

  @computed get modules(){
    return this.user.modules
  }

  @computed get policies(){
    return this.user.policies
  }

  @action hasModules = (...modules) => {
    return every(modules, m => includes(this.modules, m))
  }

  @action hasPolicies = (...policies) => {
    return every(policies, p => includes(this.policies, p))
  }
}

const singleton = new UserStore()

export default singleton
