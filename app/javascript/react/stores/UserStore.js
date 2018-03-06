import {
  observable,
  action,
  computed
} from 'mobx'

import { some, includes } from 'lodash'
import {setter}           from 'mobx-decorators'

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

  @computed get isImpersonated(){
    return !!this.user.impersonated
  }

  @action hasModules = (...modules) => {
    return some(modules, m => includes(this.modules, m))
  }

  @action hasPolicies = (...policies) => {
    return some(policies, p => includes(this.policies, p))
  }
}

const singleton = new UserStore()

export default singleton
