import React, { Component }    from 'react'
import { observer }            from 'mobx-react'
import { Modal, Input, Alert } from 'antd'
import uuid                    from 'uuid'
import SSButton                from 'ui/shell/SSButton'
import BroadcastSearch         from 'ui/shell/BroadcastSearch'
import { BroadcastDraft }      from 'stores/models/BroadcastDraft'
import TypeSelector            from './TypeSelector'

const { TextArea } = Input

@observer
class BroadcastModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'group'
    }
    this.broadcastDraft = new BroadcastDraft()
  }

  clearInputs = () => {
    this.setState({id: uuid()})
  }

  handleRecipients = (recipients) => {
    this.broadcastDraft.setRecipients(recipients)
    this.broadcastDraft.fetchContactsCount()
  }

  selectClick = (newType) => {
    this.setState({type: newType})
  }

  render(){
    return (
      <Modal
        title='New Broadcast Message'
        wrapClassName='vertical-center-modal'
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        closeable
      >
        <div>
          <BroadcastSearch
            key={this.state.id}
            type={this.state.type}
            onChange={this.handleRecipients}
            broadcastDraft={this.broadcastDraft}
            dropup
          />
        </div>
        {this.broadcastDraft.contactsCount >= BroadcastDraft.TOO_MANY && (
          <small className='text-danger'>
            Your selection contains too many contacts for a broadcast message
          </small>
        )}
        <TypeSelector
          type={this.state.type}
          selectClick={e => this.selectClick(e)}
        />
        <TextArea
          key={this.state.id}
          onChange={e => {
            this.broadcastDraft.setBody(e.target.value)
          }}
          className='mt-4'
          autosize={{ minRows: 4, maxRows: 8 }}
          placeholder='Enter your message...'
        />
        <div className='w-100'>
          <SSButton
            color='info'
            className='mt-4 mr-4 w-100'
            disabled={!this.broadcastDraft.isSendable}
            iconClass='icon icon-paper-plane'
            loading={this.broadcastDraft.isSending}
            onClick={() => this.broadcastDraft.sendBroadcast() && this.clearInputs()}
          >
            Send{this.broadcastDraft.contactsCount > 0
              ? ` to ${this.broadcastDraft.contactsCount} contacts`
              : ''
            }
          </SSButton>
          <Alert
            className='mt-2'
            type='warning'
            showIcon
            message='Not for emergency communication, delivery can take minutes'
          />
        </div>
      </Modal>
    )
  }
}

export default BroadcastModal
