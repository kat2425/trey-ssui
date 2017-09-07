import { observable, action } from 'mobx'
import uiStore                          from 'stores/UiStore'
import _                                from 'lodash'

const TIME_TO_LIVE  = 1000 * 60 * 60  // 1 hour
const INTERVAL_TIME = 1000 * 5      // 5 seconds

export default class Conversation {
  id                   = null
  store                = null
  intervalId           = null
  nonce                = null

  @observable messages = []

  constructor({ id, store, messages = [] }) {
    this.id         = id
    this.store      = store

    this.refreshNonce()
    this.update(messages)
    this.initTimer()
  }

  isCurrentConversation = () => {
    return uiStore.currentConversation === this.id
  }

  initTimer = () => {
    this.intervalId = setInterval(this.timeToLiveChecker, INTERVAL_TIME) 
  }

  @action
  add = (msg) => {
    if (!_.find(this.messages, m => m.id === msg.id)) {
      this.messages.push(msg)
      this.refreshNonce()
    }   
  }

  @action
  update = (msgs = []) => {
    this.messages.replace(msgs)
  }

  @action
  delete = () => {
    if(this.isCurrentConversation()){
      this.refreshNonce()
      return
    }

    clearInterval(this.intervalId)
    this.store.delete(this.id)
  }

  isGreaterThanAnHour = () => {
    return (Date.now() - new Date(this.nonce)) > TIME_TO_LIVE
  }

  timeToLiveChecker = () => {
    if(this.isGreaterThanAnHour()) {
      this.delete()
    }
  }

  refreshNonce = () => {
    this.nonce = Date.now()
  }
}

