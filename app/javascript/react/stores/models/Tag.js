/**
  {
    "created_at": "2017-09-25T11:48:47.121-05:00",
    "id": "0882eb7c-73b9-4195-bd40-754d6a6fe1dd",
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
