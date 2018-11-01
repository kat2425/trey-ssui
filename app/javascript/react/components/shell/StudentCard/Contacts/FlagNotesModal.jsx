import React        from 'react'
import { observer } from 'mobx-react'
import FlagNotes    from './FlagNotes'
import SSButton     from 'ui/shell/SSButton'
import { 
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap'

function FlagNotesModal({contactStore}) {
  return (
    <Modal
      isOpen    = {contactStore.showFlagNotesModal}
      toggle    = {contactStore.toggleFlagNotesModal}
      backdrop  = 'static'
      size      = 'lg'
      className = 'h-100 d-flex flex-column justify-content-center my-0'
    >
      <ModalHeader className='border-0' toggle={contactStore.toggleFlagNotesModal}>Flag Notes</ModalHeader>
      <ModalBody>
        <FlagNotes 
          contact  = {contactStore.selectedContact}
          onCancel = {contactStore.toggleFlagNotesModal}
        />
      </ModalBody>
      <ModalFooter className='border-0' >
        <SSButton color='primary' onClick={contactStore.toggleFlagNotesModal}>Close</SSButton>
      </ModalFooter>
    </Modal>
  )
}

export default observer(FlagNotesModal)
