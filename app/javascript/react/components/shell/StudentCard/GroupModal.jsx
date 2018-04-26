import React, { Component}  from 'react'
import { observer }         from 'mobx-react'
import { Modal, ModalBody } from 'reactstrap'
import GroupSelect          from './GroupSelect'
import SSButton             from 'ui/shell/SSButton'
import { isEmpty }          from 'lodash'

class GroupModal extends Component {
  state = { 
    selectedGroups: []
  }

  componentDidMount(){
    this.init(this.props)
  }

  init = (props) => {
    const { store } = props

    if(!store.selectedAttachment) return

    const selectedGroups = store.selectedAttachment.groups.map(g => g.id)

    this.setState({selectedGroups})
  }

  handleOnGroupChange = selectedGroups => {
    this.setState({selectedGroups})
  }

  render(){
    const { store }          = this.props
    const { selectedGroups } = this.state

    if(!store.selectedAttachment) return null
    return (
      <Modal
        isOpen={store.showGroupsModal}
        size="sm"
        className="h-100 d-flex flex-column justify-content-center my-0"
      >
        <ModalBody>
          <p className='mb-2'><strong>Select Groups</strong></p>
          <p 
            title={store.selectedAttachment.filename} 
            className='mb-2 text-muted text-truncate'
          >
            {store.selectedAttachment.filename}
          </p>
          <GroupSelect store={store} onChange={this.handleOnGroupChange}/>
          <div className='d-flex justify-content-end mt-2'>
            <SSButton
              className = 'btn btn-secondary mr-2'
              onClick   = {() => store.setShowGroupsModal(false)}
            >
              Cancel
            </SSButton>
            <SSButton
              disabled  = {isEmpty(selectedGroups)}
              color     = 'primary'
              loading   = {store.isUpdating}
              onClick   = {() => {
                store.changeAttachmentVisibility(store.selectedAttachment.id, 'groups', selectedGroups)
              }}
            >
              Save
            </SSButton>
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

export default observer(GroupModal)
