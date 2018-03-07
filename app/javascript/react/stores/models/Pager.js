import { observable, action, computed } from 'mobx'

export default class Pager {
  ORIG_LIMIT = 1

  @observable limit = 1
  @observable total = 0

  constructor(limit = 1, total = 0) {
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
    const _limit = (this.total > newLimit) ? newLimit : this.total

    this.limit = _limit || 1
  }
}
