import React                from 'react'
import { observer }         from 'mobx-react'
import FlagForm             from './FlagForm'
import { 
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap'

function FlagFormModal({contactStore}) {
  return (
    <Modal
      isOpen    = {contactStore.showFlagFormModal}
      toggle    = {contactStore.toggleFlagFormModal}
      backdrop  = 'static'
      className = 'h-100 d-flex flex-column justify-content-center my-0'
    >
      <ModalHeader toggle={handleOnCancel(contactStore)}>
        Why are you flagging this contact?
      </ModalHeader>
      <ModalBody>
        <FlagForm 
          contact  = {contactStore.selectedContact}
          store    = {contactStore}
          onCancel = {handleOnCancel(contactStore)}
        />
      </ModalBody>
    </Modal>
  )
}

const handleOnCancel = (contactStore) => () => {
  const { selectedContact } = contactStore

  contactStore.toggleFlagFormModal()
  selectedContact && selectedContact.clearErrors()
}

export default observer(FlagFormModal)
