import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'

import _             from 'lodash'
import xhr           from 'helpers/XHR'
import Communication from 'stores/models/Communication'

export class CommsStore {
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
        'id', 'created_at', 'type', 'preview', 'link_ref', 'direction', 'media_url',
        'length', 'user.id', 'user.username', 'user.first_name', 'user.last_name',
        'contact.id', 'contact.name', 'contact.relationship', 'contact.email', 'call_status'
      ].join(',')
    }
  })

  @action fetchCommunicationHistory = async(id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      const {data}   = await xhr.get( `/channel/communications/${id}`, this.getCommHistoryParams())

      this.fetchCommunicationHistoryOK(data)
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
