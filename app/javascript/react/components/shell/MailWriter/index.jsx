import React, { Component}  from 'react'
import PropTypes            from 'prop-types'

import { observer, inject } from 'mobx-react'

import RichTextEditor       from 'react-rte'
import Modal                from 'react-modal'
import {
  ModalHeader, ModalBody, ModalFooter,
  Button, Col, Form, FormGroup, Label, Input
} from 'reactstrap'

import fireEvent       from 'helpers/FireEvent'

const modalStyle = {
  overlay: {
    zIndex:          2000,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:  2001,
    bottom:  'auto',
    padding: 0
  }
}

const rteToolbarConfig = {
  display: [
    'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'
  ],

  INLINE_STYLE_BUTTONS: [
    {label: 'Bold',      style: 'BOLD'},
    {label: 'Italic',    style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'}
  ],

  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
  ]
}

@observer
export default class MailWriter extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      body:    RichTextEditor.createEmptyValue()
    }
  }

  onSubjectChange = (e) => {
    this.setState({ subject: e.target.value })
  }

  onBodyChange = (value) => {
    this.setState({ body: value })
  }

  hideMailer = () => {
    this.setState({
      subject: '',
      body:    RichTextEditor.createEmptyValue()
    })

    this.props.store.hideMailer()
  }

  sendEmail = (subject, message) => {
    this.props.store.sendEmail(subject, message, this.hideMailer)
  }

  render() {
    const { store } = this.props

    return (
      <Modal
        style          = {modalStyle}
        contentLabel   = 'Mailer'
        isOpen         = {store.visible}
        onRequestClose = {this.hideMailer}
      >
        <ModalHeader
          className = 'text-muted'
          toggle    = {this.hideMailer}
        >
          New Email
        </ModalHeader>

        <ModalBody className='p-0'>
          <Form className='p-3' style={{ borderBottom: '1px solid #eceeef' }}>
            <FormGroup row>
              <Label sm={2} className='text-right font-weight-bold'>To:</Label>
              <Col sm={10}>
                <Input value={store.name} readOnly />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className='text-right font-weight-bold'>Subject:</Label>
              <Col sm={10}>
                <Input value={this.state.subject} onChange={(e) => this.onSubjectChange(e)} />
              </Col>
            </FormGroup>
          </Form>

          <div className='mailer-editor'>
            <RichTextEditor
              className     = 'border-0 bg-light rounded-0'
              toolbarConfig = {rteToolbarConfig}
              value         = {this.state.body}
              onChange      = {this.onBodyChange}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color   = 'info'
            onClick = {() => {
              this.sendEmail(this.state.subject, this.state.body.toString('html'))
            }}
          >
            <span className='icon icon-paper-plane mr-2'/>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
