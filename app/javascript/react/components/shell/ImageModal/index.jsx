import React     from 'react'
import PropTypes from 'prop-types'
import { 
  Modal, 
  ModalBody, 
  ModalHeader
} from 'reactstrap'

ImageModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  src:    PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
}
export default function ImageModal({ src, isOpen, toggle }) {
  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle} 
      size='lg' 
    >
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <img 
          src={src} className='img-fluid mx-auto d-block' 
          style={{maxHeight: '80vh'}} // prevents covering the action bar at the footer
        />
      </ModalBody>
    </Modal>
  )
}

