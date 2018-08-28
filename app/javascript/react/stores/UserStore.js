import {
  observable,
  action,
  computed
} from 'mobx'

import { some, includes } from 'lodash'
import {setter}           from 'mobx-decorators'
import { 
  USER_GROUP_ADMIN, 
  STUDENT_GROUP_ADMIN 
} from 'helpers/UserModules'

export class UserStore {
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

  @computed get isSpoc(){
    return !!this.user.isSpoc
  }

  @computed get customModules() {
    return this.user.customModules
  }

  @computed get isParent(){
    return this.user.userType === 'parent'
  }

  @computed get isBetaTester(){
    return this.user.betaTester
  }

  @computed get hiddenModules() {
    return this.user.hiddenModules
  }

  @computed get canCreateGroup() {
    return this.hasModules(USER_GROUP_ADMIN, STUDENT_GROUP_ADMIN)
  }

  @action hasModules = (...modules) => {
    return some(modules, m => includes(this.modules, m))
  }

  @action hasPolicies = (...policies) => {
    return some(policies, p => includes(this.policies, p))
  }

  @action hasCustomModule = (module) => {
    return includes(this.customModules, module)
  }

  @action hasHiddenModule = (module) => {
    return includes(this.hiddenModules, module)
  }
}

export default new UserStore()
