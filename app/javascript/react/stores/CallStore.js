import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'

import Scroller   from 'stores/models/Scroller'
import Call       from 'stores/models/Call'
import userStore  from 'stores/UserStore'
import getError   from 'helpers/ErrorParser'
import UiStore    from 'stores/UiStore'

import { 
  pipe,
  filter,
  size,
  orderBy
} from 'lodash/fp'

import { 
  observable,
  action,
  computed,
  autorun
} from 'mobx'

const LIMIT = 30

export class CallStore {
  pager                            = new Scroller(LIMIT, 0)
  @setter @observable isLoading    = false
  @setter @observable isError      = null
  @observable calls                = observable.map()
  @setter @observable selectedCall = null

  constructor() {
    this.initAutoruns()
  }

  // Computed
  @computed get limit() {
    return this.pager.limit
  } 
  @computed get descCalls() {
    return orderBy(c => c.createdAt, 'desc')(this.calls.values())
  }

  @computed get missedCallCount(){
    return pipe(
      filter(c => c.isMissedCall && !c.isRead),
      size
    )(this.calls.values())
  }

  @computed
  get shouldLoadMore(){
    if(this.isLoading || this.pager.isFilled) return false
    return true
  }

  // Actions
  @action
  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        UiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }


  @action fetchCallLogs = async() => {
    try {
      this.setIsLoading(true)
      this.setIsError(null)

      const { headers, data } = await xhr.get('/commo/call_log', {
        params: { 
          user_id:         userStore.user.id,
          show_transcript: true,
          limit:           this.limit,
          except:          ['district', 'school', 'contact.student'].join(','),
        } 
      })

      this.updateScroller(headers)
      this.fetchCallLogsOk(data)
    } catch (err) {
      this.setIsError(getError(err))
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

  @action updateScroller = ({ total }) => {
    this.pager.setTotal(total)
  }

  @action loadMore = () => {
    if(!this.shouldLoadMore) return

    this.pager.increment()
    this.fetchCallLogs()
  }
}

export default new CallStore()
