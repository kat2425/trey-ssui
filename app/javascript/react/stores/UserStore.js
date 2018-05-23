import {
  observable,
  action,
  computed
} from 'mobx'

import { some, includes } from 'lodash'
import {setter}           from 'mobx-decorators'

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

  @computed get hiddenModules() {
    return this.user.hiddenModules
  }

  @computed get canCreateGroup() {
    return this.hasModules('user_group_admin', 'student_group_admin')
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
