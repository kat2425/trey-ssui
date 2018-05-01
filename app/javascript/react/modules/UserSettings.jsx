import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'

import xhr                  from 'helpers/XHR'

import Datetime             from 'react-datetime'

import {
  Button,     Card,           CardBody,   
  FormGroup,  Label,          Input,       
  InputGroup, InputGroupAddon, ButtonGroup, 
} from 'reactstrap'

export default class UserSettings extends Component {
  constructor(props) {
    super(props)

    this.state = { settings: {} }
  }

  componentDidMount() {
    this.fetchSettings()
  }

  fetchSettings() {
    xhr.get('/users/self').then(res => {
      this.setState({settings: res.data })
    })
  }

  updateMobileNumber() {
    const _number = this.state.settings.mobile_number

    xhr.put(`/users/${window.SSUser.id}/mobile_number`, {
      mobile_number: _number
    }).then(this.fetchSettings)
  }

  handleChange = (e) => {
    this.setState({ settings: { mobile_number: e.target.value }})
  }

  render() {
    return (
      <div>
        <ModuleHeader title='My Settings'/>

        <Card className='mb-4'>
          <CardBody>
            <h4 className='mb-2'>General Settings</h4>
            <div className='row mb-4' style={{borderBottom: '1px dashed rgba(0,0,0,0.1)'}}>
              <div className='col-md-6'>
                <FormGroup>
                  <Label>New Password</Label>
                  <Input/>
                </FormGroup>

                <FormGroup>
                  <Label>Confirm</Label>
                  <Input/>
                </FormGroup>
              </div>

              <div className='col-md-6'>
                <FormGroup>
                  <Label>Mobile Number</Label>

                  <Input
                    onChange = {this.handleChange}
                    value    = {this.state.settings.mobile_number}
                  />
                </FormGroup>
              </div>
            </div>

            {/* <h4 className='mb-2'>Defaults and Miscellany</h4> */}
            {/* <div className='row mb-4' style={{borderBottom: '1px dashed rgba(0,0,0,0.1)'}}> */}
            {/* </div> */}

            <h4 className='mb-2'>Office Hours</h4>
            <div className='row mb-4' style={{borderBottom: '1px dashed rgba(0,0,0,0.1)'}}>
              <div className='alert alert-warning w-100'>
                Suppress notifications from SchoolStatus unless they are received between the hours below.
              </div>

              <div className='col-md-6 pb-3'>
                <InputGroup>
                  <InputGroupAddon>
                    <span className='icon icon-light-down'/>
                  </InputGroupAddon>

                  <Datetime
                    dateFormat = {false}
                    inputProps = {{ placeholder: 'Start Time...' }}
                    input
                  />
                </InputGroup>
              </div>

              <div className='col-md-6 pb-3'>
                <InputGroup>
                  <InputGroupAddon>
                    <span className='icon icon-light-up'/>
                  </InputGroupAddon>

                  <Datetime
                    dateFormat = {false}
                    inputProps = {{ placeholder: 'End Time...' }}
                    input
                  />
                </InputGroup>
              </div>
            </div>

            <h4 className='mb-2'>Email Preferences</h4>
            <div className='row mb-4'>
              <div className='alert alert-info w-100'>
                {`SchoolStatus sends a daily aggregate of attendance and discipline\
                  data to your mailbox each morning.\
                  If you'd like to opt out of receiving this email, you may do so here.`
                }
              </div>

              <div className='w-100 d-flex justify-content-end'>
                <ButtonGroup>
                  <Button>Receive Daily</Button>
                  <Button>Disable</Button>
                </ButtonGroup>
              </div>
            </div>

            <div className='row mt-4 pt-3' style={{borderTop: '1px solid rgba(0,0,0,0.1)'}}>
              <div className='w-100 d-flex justify-content-end'>
                <Button color='danger' onClick={() => this.updateMobileNumber() }>
                  Update
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}
