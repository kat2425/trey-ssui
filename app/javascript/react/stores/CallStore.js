import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'
import xhr                              from 'helpers/XHR'
import _                                from 'lodash'

import Pager                            from 'stores/models/Pager'
import Call                             from 'stores/models/Call'

const LIMIT = 30

export class CallStore {
  pager                            = new Pager(LIMIT, 0)
  @setter @observable isLoading    = false
  @setter @observable isError      = null
  @observable calls                = observable.map()
  @setter @observable selectedCall = null

  // Computed
  @computed get limit() {
    return this.pager.limit
  } 
  @computed get descCalls() {
    return _.orderBy(this.calls.values(), c => c.createdAt, 'desc')
  }

  @computed get missedCallCount(){
    return _(this.calls.values())
      .filter(c => c.isMissedCall && !c.isRead)
      .size()
      .value()
  }

  @computed
  get shouldLoadMore(){
    if(this.isLoading || this.pager.isFilled) return false
    return true
  }

  // Actions
  @action fetchCallLogs = async() => {
    try {
      this.setIsLoading(true)
      this.setIsError(null)

      const { headers, data } = await xhr.get('/commo/call_log', { 
        params: { 
          user_id:         window.SSUser.id,
          show_transcript: true,
          limit:           this.limit,
          except:          ['district', 'school', 'student', 'contact.student'].join(','),
        } 
      })

      this.updatePager(headers)
      this.fetchCallLogsOk(data)
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchCallLogsOk = calls => {
    calls.forEach(this.createCall)  
  }

  @action createCall = call => {
    if(this.calls.has(call.id)) return
    this.calls.set(call.id, new Call(this, call))
  }

  @action updatePager = ({ total }) => {
    this.pager.setTotal(total)
  }

  @action loadMore = () => {
    if(!this.shouldLoadMore) return

    this.pager.increment()
    this.fetchCallLogs()
  }
}

const singleton = new CallStore()

export default singleton
