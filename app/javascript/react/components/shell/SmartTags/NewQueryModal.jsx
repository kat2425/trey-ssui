import React, {Component}   from 'react'
import { 
  Modal, 
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap'

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

  render(){
    const { isOpen, toggle, onCreate } = this.props

    return (
      <Modal 
        isOpen={isOpen} 
        toggle={toggle} 
        size='sm' 
        className='h-100 d-flex flex-column justify-content-center my-0'
      >
        <ModalBody>
          <Form>
            <FormGroup>
              <Input 
                onChange    = {this.handleChange}
                type        = 'text'
                name        = 'name'
                placeholder = 'Enter tag name'
                valid       =  {this.state.valid}
                size        = 'lg'
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{border: 0, padding: '10px 15px'}}>
          <Button 
            disabled={!this.state.valid} 
            color="primary" 
            onClick={() => onCreate(this.state.name)}
          >
            Create
          </Button>{' '}

          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
