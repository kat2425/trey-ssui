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
    const { attachment } = props

    if(!attachment.id) return

    const selectedGroups = attachment.groups.map(g => g.id)

    this.setState({selectedGroups})
  }

  handleOnGroupChange = selectedGroups => {
    this.setState({selectedGroups})
  }

  render(){
    const { attachment }          = this.props
    const { selectedGroups } = this.state

    if(!attachment.id) return null
    return (
      <Modal
        isOpen
        size="sm"
        className="h-100 d-flex flex-column justify-content-center my-0"
      >
        <ModalBody>
          <p className='mb-2'><strong>Select Groups</strong></p>
          <p 
            title={attachment.filename}
            className='mb-2 text-muted text-truncate'
          >
            {attachment.filename}
          </p>
          <GroupSelect attachment={attachment} onChange={this.handleOnGroupChange}/>
          <div className='d-flex justify-content-end mt-2'>
            <SSButton
              className = 'btn btn-secondary mr-2'
              onClick   = {() => attachment.setShowGroupsModal(false)}
            >
              Cancel
            </SSButton>
            <SSButton
              disabled  = {isEmpty(selectedGroups)}
              color     = 'primary'
              loading   = {attachment.isLoading}
              onClick   = {() => {
                attachment.changeVisibility('groups', selectedGroups)
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
