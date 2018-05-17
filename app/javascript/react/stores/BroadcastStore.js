import { setter }           from 'mobx-decorators'
import xhr                  from 'helpers/XHR'

import Broadcast            from 'stores/models/Broadcast'
import getError             from 'helpers/ErrorParser'
import uiStore              from 'stores/UiStore'

import {
  orderBy
} from 'lodash/fp'

import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

export class BroadcastStore {
  @setter @observable isLoading         = false
  @setter @observable isError           = null
  @observable broadcasts                = observable.map()
  @setter @observable selectedBroadcast = null

  constructor() {
    this.initAutoruns()
  }

  @computed
  get descBroadcasts() {
    return orderBy(b => b.createdAt, 'desc')(this.broadcasts.values())
  }

  @action
  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action clearData = () => {
    this.broadcasts.clear()
  }

  @action
  fetchBroadcasts = async() => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      const { data } = await xhr.get('commo/broadcast', {
        params: {
          only: [
            'id',
            'body',
            'created_at',
            'user_id',
            'contacts_count',
            'students_count',
            'recipients',
            'students.id',
            'students.full_name',
            'students.avatar_url',
            'contacts.name',
            'contacts.id',
            'contacts.student_id',
            'contacts.student.full_name',
            'contacts.relationship'
          ].join(',')
        }
      })

      this.fetchBroadcastsOk(data)
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action
  fetchBroadcastsOk = broadcasts => {
    broadcasts.forEach(this.createBroadcast)
  }

  @action
  createBroadcast = broadcast => {
    if (this.broadcasts.has(broadcast.id)) return
    this.broadcasts.set(broadcast.id, new Broadcast(this, broadcast))
  }
}


export default new BroadcastStore()
