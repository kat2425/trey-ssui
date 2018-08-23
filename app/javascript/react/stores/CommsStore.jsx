import { setter }    from 'mobx-decorators'
import moment        from 'moment'
import xhr           from 'helpers/XHR'
import Communication from 'stores/models/Communication'
import getError      from 'helpers/ErrorParser'
import uiStore       from 'stores/UiStore'

import {
  observable,
  action,
  computed,
  autorun
} from 'mobx'

import { 
  pipe, 
  map, 
  orderBy, 
  reduce, 
  filter 
} from 'lodash/fp'

export class CommsStore {
  @setter @observable isLoading    = false
  @setter @observable isError      = false
  @observable communications       = []
  @setter @observable selectedComm = null

  constructor() {
    this.initAutoruns()
  }

  @computed get sortedCommunications() {
    return orderBy(c => c.createdAt, ['desc'] )(this.communications)
  }

  getCommHistoryParams = () => ({
    params: {
      only: [
        'id', 'action', 'created_at', 'type', 'preview', 'link_ref', 'direction', 'media_url',
        'length', 'user.id', 'user.username', 'user.first_name', 'user.last_name',
        'contact.id', 'contact.name', 'contact.relationship', 'contact.email', 'contact.phone',
        'call_status', 'voicemail_url', 'language', 'meta', 'contact.student.full_name'
      ].join(',')
    }
  })

  isCommEqualToSelectedComm = (communication) => (
    communication.contact.id === this.selectedComm.contact.id &&
    communication.user.id === this.selectedComm.user.id
  )

  @computed get groupedSms() {
    return  filter(
      c => c.type === 'sms' && this.isCommEqualToSelectedComm(c)
    )(this.communications) 
  }

  @computed get groupedEmails() {
    return  filter(
      c => c.type === 'email' && this.isCommEqualToSelectedComm(c)
    )(this.communications) 
  }


  getDate = (date) => {
    return moment(date).calendar(null, {
      lastDay:  '[Yesterday]',
      sameDay:  '[Today]',
      nextDay:  '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'L'
    })
  }

  /*
   * returns @ { groupDate: [sms1, sms2] }
   * eg. {'Today':[{sms1}, {sms2}]}
   */
  @computed get orderedSms() {
    return pipe(
      map(s => {
        s['groupDate'] = this.getDate(s.createdAt)
        return s
      }),
      orderBy(['createdAt'], ['asc']),
      reduce((acc, curr) => {
        if (!acc[curr.groupDate]) {
          acc[curr.groupDate] = []
        }

        acc[curr.groupDate].push(curr)
        return acc
      }, {})
    )(this.groupedSms)
  }

  /*
   * returns @ { groupDate: [email1, email2] }
   * eg. {'Today':[{email1}, {email2}]}
   */
  @computed get orderedEmails() {
    return pipe(
      map(s => {
        s['groupDate'] = this.getDate(s.createdAt)
        return s
      }),
      orderBy(['createdAt'], ['asc']),
      reduce((acc, curr) => {
        if (!acc[curr.groupDate]) {
          acc[curr.groupDate] = []
        }

        acc[curr.groupDate].push(curr)
        return acc
      }, {})
    )(this.groupedEmails)
  }


  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
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
    this.communications.clear()
    this.selectedComm = null
  }

  @action fetchCommunicationHistory = async(id) => {
    try {
      this.clearData()
      this.setIsLoading(true)
      this.setIsError(false)

      const {data}   = await xhr.get( `/channel/communications/${id}`, this.getCommHistoryParams())

      this.fetchCommunicationHistoryOK(data)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchCommunicationHistoryOK = (data = []) => {
    this.clearData()
    data.forEach(this.createCommunication)
  }

  @action createCommunication = (comm) => {
    this.communications.push(new Communication(this, comm))
  }

  @action dispose = () => {
    this.communications.forEach(c => c.dispose())
  }
}

export default new CommsStore()
