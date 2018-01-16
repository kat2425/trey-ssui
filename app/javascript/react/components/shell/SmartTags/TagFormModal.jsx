import React                from 'react'
import { observer }         from 'mobx-react'
import { Modal, ModalBody } from 'reactstrap'
import { TagForm }          from 'ui/shell/SmartTags'

function TagFormModal({tagStore}) {
  return (
    <Modal
      isOpen={tagStore.showQueryForm}
      toggle={tagStore.toggleQueryForm}
      size="sm"
      className="h-100 d-flex flex-column justify-content-center my-0"
    >
      <ModalBody>
        <TagForm tag={tagStore.editedTag} onCancel={handleOnCancel(tagStore)} />
      </ModalBody>
    </Modal>
  )
}

const handleOnCancel = (tagStore) => () => {
  const { editedTag } = tagStore

  tagStore.toggleQueryForm()
  editedTag && editedTag.clearErrors()
}

export default observer(TagFormModal)
