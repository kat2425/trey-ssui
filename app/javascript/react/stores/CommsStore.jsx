import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'

import moment                           from 'moment'
import _                                from 'lodash'
import xhr                              from 'helpers/XHR'
import Communication                    from 'stores/models/Communication'

export class CommsStore {
  prevStudentId = null

  @setter @observable isLoading    = false
  @setter @observable isError      = false
  @observable communications       = observable.map()
  @setter @observable selectedComm = null

  @computed get sortedCommunications() {
    return _.orderBy(this.communications.values(), c => c.createdAt, ['desc'] )
  }

  getCommHistoryParams = () => ({
    params: {
      only: [
        'id', 'action', 'created_at', 'type', 'preview', 'link_ref', 'direction', 'media_url',
        'length', 'user.id', 'user.username', 'user.first_name', 'user.last_name',
        'contact.id', 'contact.name', 'contact.relationship', 'contact.email', 'call_status', 'voicemail_url'
      ].join(',')
    }
  })

  isCommEqualToSelectedComm = (communication) => (
    communication.contact.id === this.selectedComm.contact.id && 
    communication.user.id === this.selectedComm.user.id
  )

  @computed get groupedSms() {
    return _(this.communications.values())
      .filter(c => c.type === 'sms' && this.isCommEqualToSelectedComm(c))
      .value()
  }

  @computed get groupedEmails() {
    return _(this.communications.values())
      .filter(c => c.type === 'email' && this.isCommEqualToSelectedComm(c))
      .value()
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
    return _
      .chain(this.groupedSms)
      .map(s => {
        s['groupDate'] = this.getDate(s.createdAt)
        return s
      })
      .orderBy(['createdAt'], ['asc'])
      .reduce((acc, curr) => {
        if (!acc[curr.groupDate]) {
          acc[curr.groupDate] = []
        }

        acc[curr.groupDate].push(curr)
        return acc
      }, {})
      .value()
  }

  /*
   * returns @ { groupDate: [email1, email2] }
   * eg. {'Today':[{email1}, {email2}]}
   */
  @computed get orderedEmails() {
    return _
      .chain(this.groupedEmails)
      .map(s => {
        s['groupDate'] = this.getDate(s.createdAt)
        return s
      })
      .orderBy(['createdAt'], ['asc'])
      .reduce((acc, curr) => {
        if (!acc[curr.groupDate]) {
          acc[curr.groupDate] = []
        }

        acc[curr.groupDate].push(curr)
        return acc
      }, {})
      .value()
  }

  @action clearData = () => {
    this.communications.clear()
    this.selectedComm = null
  }

  @action fetchCommunicationHistory = async(id) => {
    try {
      if(this.prevStudentId !== id){
        this.clearData()
      }

      this.setIsLoading(true)
      this.setIsError(false)


      const {data}   = await xhr.get( `/channel/communications/${id}`, this.getCommHistoryParams())

      this.fetchCommunicationHistoryOK(data)
      this.prevStudentId = id
    } catch(e){
      this.setIsError(true)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchCommunicationHistoryOK = (data) => {
    data.forEach(this.createCommunication)
  }

  @action createCommunication = (comm) => {
    if(this.communications.has(comm.id)) return
    this.communications.set(comm.id, new Communication(this, comm))
  }
}

const singleton = new CommsStore()

export default singleton
