import { observable, action } from 'mobx'
import uiStore                from 'stores/UiStore'
import Message                from 'stores/models/Message'

const TIME_TO_LIVE  = 1000 * 60 * 60  // 1 hour
const INTERVAL_TIME = 1000 * 5      // 5 seconds

export default class Conversation {
  id                   = null
  store                = null
  intervalId           = null
  nonce                = null

  @observable messages = observable.map()

  constructor({ id, store, messages = [] }) {
    this.id         = id
    this.store      = store

    this.refreshNonce()
    this.updateMessages(messages)
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
    if(this.messages.has(msg.id)) {
      this.updateMessage(msg)
      return
    }

    this.messages.set(msg.id, new Message(this, msg))
  }

  @action
  remove = (msg) => {
    this.messages.delete(msg.id)
  }

  @action
  updateMessage = (msg) => {
    const _msg = this.messages.get(msg.id)

    _msg.update(msg)
  }

  @action
  updateMessages = (msgs = []) => {
    msgs.forEach(this.add)
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
