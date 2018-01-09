import { observable, autorun, reaction, action } from 'mobx'
import { setter, toggle }                        from 'mobx-decorators'

import SMSConversationStore                      from 'stores/SMSConversation'
import callStore                                 from 'stores/CallStore'
import ReminderStore                             from 'stores/ReminderStore'
import fireEvent                                 from 'helpers/FireEvent'

export const SIDEBAR = {
  SMS:      'SMS',
  CALL:     'CALL',
  REMINDER: 'REMINDER'
}

export class UiStore {
  @observable
  selectedSidebar = null

  @setter @observable 
  currentContact = null

  @setter @observable 
  currentConversation = null

  @setter @observable 
  showInbox = true

  @setter @observable 
  shouldScrollToBottom = true

  @setter @observable 
  showCallInfo = false

  @setter @observable 
  sidebarMaxHeight = false

  @setter @observable 
  isStudentCardOpen = false

  @observable notifications = []

  constructor() {
    this.autoFetchSMSConversation() 
  }

  @action addNotification(title, body) {
    this.notifications.push({title, body})
  }

  @action removeNotification(index) {
    this.notifications.splice(index, 1)
  }

  // Auto Actions
  @action autoFetchSMSConversation(){
    autorun('fetch conversation everytime it is updated', () => {
      if(!this.currentConversation) return 

      this.shouldScrollToBottom = true
      SMSConversationStore.fetchConversation(this.currentConversation)
    })
  }

  @action handleCallSidebar(){
    callStore.fetchCallLogs()
  }

  @action handleReminderSidebar(){
    ReminderStore.fetchReminders()
  }

  @action autoHideCallInfo = () => {
    reaction(
      ()     => !this.hideSidebar || !this.showCallSidebar,
      (hide) => hide && this.showCallInfo && (this.showCallInfo = false),
      true
    )
  }

  @action
  setSelectedSidebar = (sidebar) => {
    this.selectedSidebar = sidebar
  }
}

const singleton = new UiStore()

export default singleton
