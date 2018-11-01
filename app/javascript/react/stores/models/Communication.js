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
  },
  voicemail_url: null
}
*/

import {
  observable,
  action,
  computed,
  reaction,
  autorun,
  runInAction
} from 'mobx'

import { setter } from 'mobx-decorators'
import DateFormat from 'helpers/DateFormat'
import _          from 'lodash'
import xhr        from 'helpers/XHR'
import uiStore    from 'stores/UiStore'
import Transcript from 'stores/models/Transcript'

export default class Communication {
  commsStore   = null
  id           = null
  createdAt    = null
  contact      = null
  user         = null
  direction    = null
  voicemailUrl = null
  mediaUrl     = null
  _transcript  = new Transcript()
  relationship = null
  broadcastId  = null

  @setter @observable length        = 0
  @setter @observable preview       = null
  @setter @observable callStatus    = null
  @setter @observable email         = null
  @setter @observable isLoading     = false
  @setter @observable isTranslating = false
  @setter @observable isError       = null
  @setter @observable type          = null

  constructor(store, json){
    this.commsStore = store
    this.update(json)

    this.initAutoruns()
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

  @computed get isVoicemail(){
    return this._transcript.isVoicemail
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

  @computed get studentName(){
    return this.contact.student.full_name
  }

  @computed get transcript(){
    return this._transcript.transcript
  }

  @computed get isFetchingTranscript(){
    return this._transcript.isFetchingTranscript
  }

  @computed get originalTranscript(){
    return this._transcript.originalTranscript
  }

  @computed get isBroadcast(){
    return !!this.broadcastId
  }

  // Autoruns
  initAutoruns = () => {
    this.autoFetchTranscript()
    this.autoFetchEmail()
    this.autoFetchVoicemail()
    this.autoFetchCallNotes()

    this.autoErrorNotifier()
  }

  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    'error'
        })
      }
    })
  }

  @action autoFetchTranscript = () => {
    reaction(
      ()        => this.isActive && this.isCall,
      (isFetch) => isFetch && this._transcript.fetchCallTranscript(this.id),
      true
    )
  }

  @action autoFetchVoicemail = () => {
    reaction(
      ()        => this.isActive && this.isVoicemail,
      (isFetch) => isFetch && this.fetchVoicemail(),
      true
    )
  }

  @action autoFetchEmail = () => {
    reaction(
      ()        => this.isEmail,
      (isFetch) => isFetch && this.fetchEmail(),
      true
    )
  }

  @action autoFetchSms = () => {
    reaction(
      ()        => this.isActive && this.isSms,
      (isFetch) => isFetch && this.fetchSms(),
      true
    )
  }

  @action autoFetchCallNotes = () => {
    reaction(
      () => this.isActive && this.isCall,
      (isFetch) => isFetch && this.fetchCallNotes(),
      true
    )
  }

  @action fetchCallNotes = async(params, id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      return await xhr.get(`/commo/call_log/${id}`, {
        params: {
          only: 'notes'
        }
      }).
        then((e) => { this.notes = e.data.notes })
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action update = ({
    id,
    broadcast_id:  broadcastId,
    created_at:    createdAt,
    call_status:   callStatus,
    media_url:     mediaUrl,
    voicemail_url: voicemailUrl,
    contact,
    user,
    length,
    preview,
    direction,
    type
  }) => {
    this.id           = id
    this.broadcastId  = broadcastId
    this.createdAt    = createdAt
    this.contact      = contact
    this.mediaUrl     = mediaUrl
    this.user         = user
    this.length       = length ? length.length : 0
    this.preview      = voicemailUrl ? voicemailUrl : preview
    this.direction    = direction
    this.callStatus   = callStatus
    this.voicemailUrl = voicemailUrl
    this.type         = voicemailUrl ? 'voicemail' : type
    this.relationship = contact.relationship

    this._transcript.setIsVoicemail(!!voicemailUrl)
  }

  @action handleSelect = () => {
    this.commsStore.setSelectedComm(this)
  }

  @action handleOnTranslate = (isError, translatedText) => {
    !isError && this._transcript.translateTranscript(translatedText)
  }

  @action handleOnTranslating = (isTranslating) => {
    this.setIsTranslating(isTranslating)
  }

  @action fetchEmail = async(id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

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
      this.setIsError(false)

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

  @action fetchCallLog = async(params, id = this.id) => {
    try {
      this.setIsLoading(true)
      this.setIsError(false)

      return await xhr.get(`/commo/call_log/${id}`, {
        params: params
      })
    } catch (err) {
      this.setIsError(err)
    } finally {
      this.setIsLoading(false)
    }
  }

  @action fetchVoicemail = async() => {
    try {
      const {data}      = await this.fetchCallLog({only: ['voicemails'].join(',')})
      const {voicemails} = data

      if(_.isEmpty(voicemails)) return

      const {duration = 0, transcript = ''} = voicemails[0]

      runInAction(() => {
        this.setLength(duration)
        this._transcript.setVoiceTranscript(transcript)
      })
    } catch(err){
      this.setIsError(err)
    }
  }

  @action dispose = () => {
    this._transcript.dispose()
  }
}
