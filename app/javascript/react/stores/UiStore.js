import { setter }           from 'mobx-decorators'
import SMSConversationStore from 'stores/SMSConversation'
import callStore            from 'stores/CallStore'
import ReminderStore        from 'stores/ReminderStore'
import { notification }     from 'antd'

import { 
  observable, 
  autorun, 
  reaction, 
  action
} from 'mobx'

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
    this.autoFetchCallLogs()
    this.autoHideCallInfo()
  }

  // Actions
  @action addNotification({title, message, type}) {
    notification[type]({
      message:     title,
      description: message,
    })
  }

  @action setSidebarVisibility(show){
    this.hideSidebar = !show 
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

  @action autoFetchCallLogs(){
    reaction(
      ()     => this.showCallSidebar,
      (show) => show && callStore.fetchCallLogs()
    ) 
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
