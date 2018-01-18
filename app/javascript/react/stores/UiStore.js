import { setter, toggle }   from 'mobx-decorators'

import SMSConversationStore from 'stores/SMSConversation'
import callStore            from 'stores/CallStore'
import { notification }     from 'antd'
import _                    from 'lodash'

import { 
  observable, 
  autorun, 
  reaction, 
  action,
  computed
} from 'mobx'

export class UiStore {
  @setter @observable 
  currentContact = null

  @setter @observable 
  currentConversation = null

  @toggle('toggleSidebar') @observable 
  hideSidebar = true
  
  @toggle('toggleCallSidebar') @observable 
  showCallSidebar = false

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
    this.autoHideSMSSidebar()
    this.autoHideCallSidebar()
    this.autoHideCallInfo()
    this.autoNotify()
  }

  // Computed
  @computed get uniqueNotifications(){
    return _.uniqWith(this.notifications, _.isEqual)
  }

  // Actions
  @action addNotification(title, body) {
    this.notifications.push({title, body})
  }

  @action removeNotification(index) {
    this.notifications.splice(index, 1)
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

  @action autoNotify(){
    autorun('notifications', () => {
      if(_.isEmpty(this.uniqueNotifications)) return

      this.uniqueNotifications.forEach(({type = 'warning', title, body}, i) => {
        notification[type]({
          key:         i,
          message:     title,
          description: body,
          onClose:     () => this.removeNotification(i),
          style:       {
            marginTop: 40
          }
        })
      })
    })
  }

  @action autoFetchCallLogs(){
    reaction(
      ()     => this.showCallSidebar,
      (show) => show && callStore.fetchCallLogs()
    ) 
  }

  @action autoHideSMSSidebar = () => {
    reaction(
      ()     => this.showCallSidebar === true,
      (show) => show && !this.hideSidebar && (this.hideSidebar = true),
      true
    )
  }

  @action autoHideCallSidebar = () => {
    reaction(
      ()            => !this.hideSidebar,
      (showSidebar) => {
        if(showSidebar && this.showCallSidebar){ 
          this.showCallSidebar = false
          this.showCallInfo    = false
        }
      },
      true
    )
  }

  @action autoHideCallInfo = () => {
    reaction(
      ()     => !this.hideSidebar || !this.showCallSidebar,
      (hide) => hide && this.showCallInfo && (this.showCallInfo = false),
      true
    )
  }
}

const singleton = new UiStore()

export default singleton
