import React                      from 'react'
import { Modal }                  from 'antd'
import parentStore, { MODAL }     from 'stores/ParentAccessManagementStore'
import renderIf                   from 'render-if'
import EditParent                 from './EditParent'
import InviteParent               from './InviteParent'
import { capitalize }             from 'lodash/fp'
import { observer }               from 'mobx-react'

const ParentModal = () => {
  const title = capitalize(parentStore.showModal)

  return (
    <Modal
      style={cardStyle}
      visible={parentStore.showModal !== MODAL.NONE}
      onCancel  = {closeModal}
      footer    = {null}
      width     = {600}
      title     = {
        <h3 className='text-center'>
          {parentStore.showModal ? `${title} Parent` : null}
        </h3>
      }
    >
      {renderIf(parentStore.showModal === MODAL.EDIT)(
        <EditParent store={parentStore}/>
      )}
      {renderIf(parentStore.showModal === MODAL.INVITE)(
        <InviteParent store={parentStore} />
      )}
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

const closeModal = () => parentStore.setShowModal(MODAL.NONE)

export default observer(ParentModal)
