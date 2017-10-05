/**
  {
    "action": null,
    "contact_id": "8ff2e1f4-422a-4713-b414-5c4092e6fc3a",
    "created_at": "2017-09-25T11:48:47.121-05:00",
    "dial_call_status": "no-answer",
    "direction": "outgoing",
    "district_id": "5126918ae9c77f9384000053",
    "id": "0882eb7c-73b9-4195-bd40-754d6a6fe1dd",
    "recording_duration": 0,
    "recording_path": null,
    "recording_sid": null,
    "school_id": "51269191e9c77f9384000455",
    "student_id": "51db4bd8e9c77f81290001ec",
    "user_id": "adf387de-51f6-4b57-9250-1b4b9b120b59",
    "notes": [],
    "voicemails": [],
    "call_transcripts":[{}]
  }
*/

import { observable, action, computed } from 'mobx'
import { setter }                       from 'mobx-decorators'
import DateFormat                       from 'helpers/DateFormat'
import uiStore                          from 'stores/UiStore'
import _                                from 'lodash'

export default class Call {
  callStore         = null
  id                = null
  createdAt         = null
  contact           = null
  user              = null
  recordingDuration = 0
  recordingPath     = null
  direction         = null

  @setter @observable callStatus = null
  @setter @observable isRead     = true

  constructor(store, json){
    this.callStore = store
    this.update(json)
  }

  // Computed
  @computed get isMissedCall(){
    return this.callStatus !== 'completed'
  }

  @computed get isIncoming(){
    return this.direction === 'incoming'
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

  // Actions
  @action markAsRead = () => {
    this.isRead = true
  }

  @action update = ({
    id,
    created_at:          createdAt,
    dial_call_status:   callStatus,
    contact,
    user,
    recording_duration: recordingDuration,
    recording_path:     recordingPath,
    direction,
    call_transcripts:   callTranscripts
  }) => {
    this.id                = id
    this.createdAt         = createdAt
    this.contact           = contact
    this.user              = user
    this.recordingDuration = recordingDuration
    this.recordingPath     = recordingPath
    this.direction         = direction
    this.callStatus        = callStatus
    this.callTranscript    = callTranscripts.length ? callTranscripts[0].call_transcript : []
  }

  @action handleSelect = () => {
    this.callStore.setSelectedCall(this)
    uiStore.setShowCallInfo(true)
  }
}