import { observable, action, computed } from 'mobx'
import { setter } from 'mobx-decorators'

export default class Pager {
  ORIG_LIMIT = 0

  @observable limit = 0
  @observable total = 0

  constructor(limit = 0, total = 0) {
    this.limit      = limit
    this.total      = parseInt(total)
    this.ORIG_LIMIT = limit
  }

  @computed
  get isFilled() {
    return this.total === this.limit
  }

  @action setTotal = total => {
    this.total = parseInt(total)
  }

  @action increment = () => {
    const newLimit = this.limit + this.ORIG_LIMIT

    this.limit = (this.total > newLimit) ? newLimit : this.total
  }
}