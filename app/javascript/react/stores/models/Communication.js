/**
{
  id: '93bdf5f2-dfee-4d97-ae3c-fe57bf362eef',
  created_at: '2017-10-02T09:35:37.848-05:00',
  type: 'call',
  preview: '',
  link_ref: '',
  direction: 'outgoing',
  user: {
    id: '16c4c928-d91b-4c1b-bfd0-c03d9c80d14c',
    username: 'tyler@schoolstatus.com',
    first_name: 'Tyler',
    last_name: 'Cummings'
  },
  contact: {
    id: '1381288f-bbf2-4e34-b041-1752b2af4c75',
    name: 'Lee, Ellen',
    email: 'ellen@schoolstatus.com',
    relationship: 'Cousin'
  },
  length: {
    length: 28,
    unit: 'seconds'
  }
}
*/

import { observable, action, computed, reaction } from 'mobx'

import { setter }                       from 'mobx-decorators'
import DateFormat                       from 'helpers/DateFormat'
import _                                from 'lodash'
import xhr                              from 'helpers/XHR'

export default class Communication {
  commsStore = null
  id         = null
  createdAt  = null
  contact    = null
  user       = null
  length     = 0
  preview    = null
  direction  = null
  type       = null

  @setter @observable callStatus     = null
  @setter @observable callTranscript = null
  @setter @observable email          = null
  @setter @observable isLoading      = false
  @setter @observable isError        = null

  constructor(store, json){
    this.commsStore = store
    this.update(json)

    this.autoFetchTranscript()
    this.autoFetchEmail()
    this.autoFetchSms()
  }

  // Computed
  @computed get isMissedCall(){
    return this.callStatus !== 'completed'
  }

  @computed get isIncoming(){
    switch (this.type) {
    case 'call':
    case 'voicemail':
    case 'email':
      return this.direction === 'incoming'
    case 'sms':
      return this.direction === 'inbound'
    }
  }

  @computed get isCall(){
    return this.type === 'call'
  }

  @computed get isSms(){
    return this.type === 'sms'
  }

  @computed get isEmail(){
    return this.type === 'email'
  }

  @computed get isActive(){
    return this.commsStore.selectedComm === this
  }

  @computed get fullDate(){
    return `${DateFormat.fullDate(this.createdAt)} at ${DateFormat.time12Hour(this.createdAt)}`
  }

  @computed get timeAgo(){
    return DateFormat.timeAgo(this.createdAt)
  }

  @computed get userName(){
    return `${this.user.first_name} ${this.user.last_name}`
  }

  @computed get contactName(){
    return this.contact.name
  }

  @computed get transcript(){
    if(_.isEmpty(this.callTranscript)) return []

    return this.callTranscript
      .split(/Speaker\s/)
      .slice(1)    
      .map(t => t.match(/(\d:)(.*)/).slice(1))
      .map(([speakerNumber, speech]) =>  ({
        speaker: `Speaker ${speakerNumber}`,
        speech:  speech
      }))
  }

  @action autoFetchTranscript(){
    reaction(
      () => this.isCall && this.commsStore.selectedComm === this,
      (isFetch) => isFetch && this.fetchTranscript(),
      true
    ) 
  }

  @action autoFetchEmail(){
    reaction(
      () => this.isEmail && this.commsStore.selectedComm === this,
      (isFetch) => isFetch && this.fetchEmail(),
      true
    ) 
  }

  @action autoFetchSms(){
    reaction(
      () => this.isSms && this.commsStore.selectedComm === this,
      (isFetch) => isFetch && this.fetchSms(),
      true
    ) 
  }

  @action update = ({
    id,
    created_at:       createdAt,
    call_status:      callStatus,
    contact,
    user,
    length,
    preview,
    direction,
    type
  }) => {
    this.id             = id
    this.createdAt      = createdAt
    this.contact        = contact
    this.user           = user
    this.length         = length.length
    this.preview        = preview
    this.direction      = direction
    this.callStatus     = callStatus
    this.type           = type
  }

  @action handleSelect = () => {
    this.commsStore.setSelectedComm(this)
  }

  // Actions
  @action fetchTranscript = async(id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(null)

      const { data } = await xhr.get(`/commo/call_log/${id}`, { 
        params: { 
          show_transcript: true,
          only:            ['call_transcripts.call_transcript'].join(',')
        } 
      })

      this.fetchTranscriptOk(data)
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchTranscriptOk = data => {
    this.updateTranscript(data)
  }

  @action updateTranscript = ({call_transcripts : callTranscripts}) => {
    this.callTranscript = callTranscripts && callTranscripts.length ? callTranscripts[0].call_transcript : ''
  }

  @action fetchEmail = async(id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(null)

      const { data } = await xhr.get(`/commo/email_log/${id}`, { 
        params: { 
          only: ['body','subject'].join(',')
        } 
      })

      this.email = data
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchSms = async(id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(null)

      const { data } = await xhr.get(`/commo/sms_log/${id}`, { 
        params: { 
          only: ['body'].join(',')
        } 
      })

      this.sms = data
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }
}
