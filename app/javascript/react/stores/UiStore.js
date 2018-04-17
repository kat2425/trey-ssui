import { setter }                    from 'mobx-decorators'
import SMSConversationStore          from 'stores/SMSConversation'
import callStore                     from 'stores/CallStore'
import ReminderStore                 from 'stores/ReminderStore'
import { notification, message }     from 'antd'
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

  @setter @observable
  isReportingInUse = false

  @setter @observable
  isFeedbakInUse = false

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
      style:       getNotificationStyle(type)
    })
  }

  @action addMessage(msg, type = 'success') {
    if(!msg) return
    return message[type](msg)
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
    if (this.selectedSidebar === sidebar) {
      this.selectedSidebar = null
    } else {
      this.selectedSidebar = sidebar
    }
  }
}

function getNotificationStyle(type){
  return {
    success: {
      color:           'rgba(0, 0, 0, 0.65)',
      border:          '1px solid #b7eb8f',
      backgroundColor: '#f6ffed'
    },
    warning: {
      color:           'rgba(0, 0, 0, 0.65)',
      border:          '1px solid #ffe58f',
      backgroundColor: '#fffbe6'
    },
    error: {
      color:           'rgba(0, 0, 0, 0.65)',
      border:          '1px solid #ffa39e',
      backgroundColor: '#fff1f0'
    },
    info: {
      color:           'rgba(0, 0, 0, 0.65)',
      border:          '1px solid #91d5ff',
      backgroundColor: '#e6f7ff'
    }
  }[type]
}

export default new UiStore()
