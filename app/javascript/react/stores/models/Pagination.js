/**
 * Props are the same as below: 
 * https://ant.design/components/pagination/
 */

import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'

const LIMIT = 15

export default class Pagination {
  store                                   = null

  @setter @observable pageSize            = LIMIT
  @setter @observable current             = 1
  @setter @observable total               = 0
  @setter @observable currentTotalResults = 0

  constructor(store, size = LIMIT, current = 1, total = 0){
    this.store    = store

    this.pageSize = size
    this.current  = current
    this.total    = total
  }

  @computed get showLoadingMore() {
    return this.currentTotalResults > 0 && this.currentTotalResults < this.total
  }

  @computed get totalPages() {
    const pages = Math.ceil(this.total / LIMIT)

    return parseInt(pages)
  }

  @action loadMore = () => {
    this.current++
    this.store.onPageChange()
  }

  @action clear = () => {
    this.pageSize = LIMIT
    this.current  = 1
    this.total    = 0
  }

  @action onChange = (page, pageSize = LIMIT) => {
    this.current  = page
    this.pageSize = pageSize
    this.store.onPageChange()
  }

  @action calculateTotalResults = () => {
    const t = LIMIT * this.current

    this.currentTotalResults = (t <= this.total) ? t : this.total
  }
}
