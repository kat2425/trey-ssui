import React, { Component } from 'react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import VJSChart             from 'ui/vjs/VJSChart'

import xhr                  from 'helpers/XHR'

import {
  Container,  Row,            Col,         Collapse,
  Button,     Card,           CardBlock,   UncontrolledTooltip,
  CardHeader, CardImg,        CardTitle,   CardSubtitle,
  Badge,      Table,          ButtonGroup, Form,
  FormGroup,  Label,          Input,       FormText,
  Pagination, PaginationItem, PaginationLink
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
    }).then(res => this.fetchSettings)
  }

  handleChange = (e) => {
    this.setState({ settings: { mobile_number: e.target.value }})
  }

  render() {
    return (
      <div>
        <ModuleHeader title='User Configuration'/>

        <Card className='mb-4'>
          <CardBlock>
            <h5>General Settings</h5>

            <div className='row'>
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

            <div style={{borderTop: '1px solid rgba(0,0,0,0.125)'}}>
              <br/>
              <div className='text-right'>
                <Button onClick={() => this.updateMobileNumber() }>
                  Save
                </Button>
              </div>
            </div>
          </CardBlock>
        </Card>
      </div>
    )
  }
}
