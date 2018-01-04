import React, {Component}   from 'react'
import { observer } from 'mobx-react'
import { 
  Modal, 
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  Button,
  Input,
  FormFeedback
} from 'reactstrap'

@observer
export default class NewQueryModal extends Component{
  state = { name: ''}

  handleChange = (e) => {
    if(!this.isDirty){
      this.isDirty = true
    }
    const name = e.target.value

    this.setState({
      name,
      valid: this.isDirty && name.length > 0
    })
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
          <Form
            onSubmit={(e) => {
              store.createTag(this.state.name)
              e.preventDefault()
            }}
          >
            <FormGroup>
              <Input
                onChange={this.handleChange}
                type="text"
                name="name"
                placeholder="Enter tag name"
                valid={this.state.valid}
                size="lg"
                required
              />
              {store.selectedTag && store.selectedTag.isError && (
                <FormFeedback style={{color: '#D43545'}}>{store.selectedTag.isError.message}</FormFeedback>
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{border: 0, padding: '10px 15px'}}>
          <Button
            disabled={!this.state.valid}
            color="primary"
            onClick={() => store.createTag(this.state.name)}
          >
            Create
          </Button>{' '}
          <Button color="secondary" onClick={store.toggleQueryForm}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
