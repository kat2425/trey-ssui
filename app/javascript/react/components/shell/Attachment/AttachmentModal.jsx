import React                from 'react'
import PropTypes            from 'prop-types'
import { 
  Modal, 
  ModalBody, 
  ModalHeader
} from 'reactstrap'

AttachmentModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  src:    PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
}
export default function AttachmentModal({ src, isOpen, toggle }) {
  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle} 
      size='lg' 
      className='h-100 d-flex flex-column justify-content-center my-0'
    >
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <img src={src} className='img-fluid mx-auto d-block'/>
      </ModalBody>
    </Modal>
  )
}

