import React, { Component}  from 'react'

import { inject, observer } from 'mobx-react'

import ChatInput            from 'ui/shell/SMS/ChatInput/'
import SMS                  from 'ui/shell/SMS/SMS'
import ConversationHeader   from 'ui/shell/SMS/ConversationHeader'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'

import VisibilitySensor     from 'react-visibility-sensor'
import userStore            from 'stores/UserStore'

const conversationStyle = {
  backgroundColor: 'rgb(244,247,249)',
  width:           '100%',
  height:          '100%',
  position:        'relative',
  overflow:        'auto',
}

const fooStyle = () => ({
  backgroundColor: '#ffffff',
  borderTop:       '1px solid rgba(255,255,255,0.75)',
  borderBottom:    '1px solid rgba(0,0,0,0.125)',
  boxShadow:       '0 1px 1px rgba(0,0,0,0.15)',
  position:        'absolute',
  width:           '100%',
  height:          '103px',
  top:             57
})

const redContainer = () => ({
  backgroundColor: 'rgb(244,247,249)',
  position:        'absolute',
  width:           '100%',
  top:             '160px',
  bottom:          '145px',
  overflow:        'auto'
})

const redStyle = {
  overflow: 'auto'
}

const yellowStyle = () => ({
  position:     'absolute',
  bottom:       50,
  borderBottom: '1px solid rgba(0,0,0,0.25)',
  width:        '100%'
})

const Spinner = () => (
  <div className='text-center'>
    <LoadingSpinner/>
  </div>
)

@inject('uiStore')
@observer
export default class SMSController extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (isVisible) => {
    if(!isVisible) return
    this.props.store.loadMore()
  }

  getPlaceholder = () => {
    const { uiStore } = this.props
    const studentName = uiStore.currentContact.student.full_name
    const relationship = uiStore.currentContact.relationship
    const relationshipText = relationship ? `'s ${relationship}` : ` Contact`

    return `Send to ${studentName}${relationshipText}`
  }

  render() {
    const { uiStore, store, handleBack } = this.props
    const isSecondary = uiStore.sidebarMaxHeight ? true : false

    return (
      <div style={conversationStyle}>
        <div style={fooStyle(isSecondary)}>
          <ConversationHeader
            contact    = {uiStore.currentContact}
            handleBack = {handleBack}
            store      = {store}
          />
        </div>

        <div style={redContainer(isSecondary)}>
          <div style={redStyle}>
            <VisibilitySensor onChange={this.handleChange}>
              <div className='invisible p-1'>invisible</div>
            </VisibilitySensor>

            { store.isLoading && <Spinner /> }

            <SMS
              conversation = {uiStore.currentConversation}
              store        = {store}
            />
          </div>
        </div>

        <div style={yellowStyle(isSecondary)}>
          <ChatInput 
            placeholder = {!userStore.user.higherEd && this.getPlaceholder()}
            contact     = {uiStore.currentContact} 
          />
        </div>
      </div>
    )
  }
}
