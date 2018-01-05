import React, {Component}   from 'react'
import { observer }         from 'mobx-react'
import { Modal, ModalBody } from 'reactstrap'
import { TagNameForm }      from 'ui/shell/SmartTags'

@observer
export default class NewQueryModal extends Component{
  handleOnCancel = () => {
    const { store } = this.props

    store.toggleQueryForm()
    store.selectedTag.clearErrors(null)
  }

  render() {
    const {store} = this.props

    return (
      <Modal
        isOpen={store.showQueryForm}
        toggle={store.toggleQueryForm}
        size="sm"
        className="h-100 d-flex flex-column justify-content-center my-0"
      >
        <ModalBody>
          <TagNameForm tag={store.selectedTag} onCancel={this.handleOnCancel} />
        </ModalBody>
      </Modal>
    )
  }
}
