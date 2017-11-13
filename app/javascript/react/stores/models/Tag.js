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

import {action} from 'mobx'

export default class Tag {
  tagStore          = null
  id                = null
  createdAt         = null

  constructor(store, json){
    this.tagStore = store
    this.update(json)
  }

  @action update = ({ id, created_at: createdAt }) => { 
    this.id = id
    this.createdAt = createdAt
  }
}
