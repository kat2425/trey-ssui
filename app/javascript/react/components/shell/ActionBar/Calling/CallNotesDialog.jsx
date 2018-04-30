import React, { Component }    from 'react'
import { observer }            from 'mobx-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CallNotesForm           from './CallNotesForm'

@observer
export default class CallNotesDialog extends Component {
  handleChange = (e) => {
    const { setCallNoteText } = this.props.callingStore

    setCallNoteText(e.target.value)
  }

  handleSave = () => {
    const { addCallNote } = this.props.callingStore

    addCallNote()
  }

  handleCancel = () => {
    const { callingStore } = this.props

    callingStore.setIsCallNotesSelected(false)
    callingStore.setCallNoteText('')
  }

  renderNotesForm = () => {
    const { 
      isCallNotesSelected, 
      contactName,
      callNoteText 
    } = this.props.callingStore
    const position = isCallNotesSelected ? '100%' : '-200px'

    return (
      <CallNotesForm 
        onSave         = {this.handleSave}
        onCancel       = {this.handleCancel}
        Text           = {callNoteText}
        onTextChange   = {(e) => this.handleChange(e)}
        contactName    = {contactName}
        bottomPosition = {position}
      />
    )
  }

  render() {
    const { 
      isCallNotesSelected
    } = this.props.callingStore

    return (
      <ReactCSSTransitionGroup
        transitionName         = "call-note-container"
        transitionEnterTimeout = {300}
        transitionLeaveTimeout = {300}
      >
        {isCallNotesSelected &&
          this.renderNotesForm()
        }
      </ReactCSSTransitionGroup>
    )
  }
}