import { observable, autorun, action }     from 'mobx'
import { setter, toggle } from 'mobx-decorators'

import SMSConversationStore from 'stores/SMSConversation'

export class UiStore {
  @setter @observable 
  currentContact = null

  @setter @observable 
  currentConversation = null

  @toggle('toggleSidebar') @observable 
  hideSidebar = true

  @setter @observable 
  showInbox = true

  @setter @observable 
  shouldScrollToBottom = true

  @setter @observable 
  sidebarMaxHeight = false

  constructor() {
    autorun('fetch conversation everytime it is updated', () => {
      if(!this.currentConversation) return 

      this.shouldScrollToBottom = true
      SMSConversationStore.fetchConversation(this.currentConversation)
    })
  }

  // Actions
  @action setSidebarVisibility(show){
    this.hideSidebar = !show 
  }
}

export default new UiStore()
