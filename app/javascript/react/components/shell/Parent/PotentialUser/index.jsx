import React           from 'react'
import ParentForm      from './ParentForm'
import { Modal }       from 'antd'
import parentStore     from 'stores/ParentAccessManagementStore'
import { observer }    from 'mobx-react'

const ParentView = () => {
  return (
    <Modal
      style={cardStyle}
      visible={parentStore.showModal}
      onCancel  = {closeModal}
      footer    = {null}
      width     = {600}
      title     = {<h3 className='text-center'>Add Parent</h3>}
    >
      <ParentForm store={parentStore} />
    </Modal>
  )
}

const cardStyle = {
  overlay: {
    zIndex:          1027,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:          1028,
    backgroundColor: '#f7f9fb',
    paddingLeft:     '15px',
    paddingRight:    '15px',
    paddingTop:      '10px',
    paddingBottom:   '0px',
    height:          'calc(100vh - 120px)',
    marginTop:       '25px'
  }
}

const closeModal = () => parentStore.setShowModal(false)

export default observer(ParentView)
