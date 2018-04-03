import {
  ModalHeader, ModalBody, ModalFooter,
  Button, Col, Form, FormGroup, Label, Input
} from 'reactstrap'


import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { observer }         from 'mobx-react'
import RichTextEditor       from 'react-rte'
import Modal                from 'react-modal'

import { isEmptyHTML }      from 'helpers/HTMLParser'

import Dragger              from './Dragger'
import DragIcon             from './DragIcon'

import TranslationContainer from 'ui/shell/TranslationContainer'

import { STATE }            from 'stores/models/Translator'
import uiStore              from 'stores/UiStore'
import userStore            from 'stores/UserStore'

@observer
export default class MailWriter extends Component {
  state = {
    subject:       '',
    body:          RichTextEditor.createEmptyValue(),
    fileList:      [],
    sending:       false,
    isTranslating: false
  }

  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  onSubjectChange = (e) => {
    this.setState({ subject: e.target.value })
  }

  onBodyChange = (body) => {
    this.setState({ body })
  }

  onSuccess = () => {
    this.hideMailer()
    uiStore.addMessage('Email sent successfully', 'success')
  }

  resetValues = () => {
    this.setState({
      subject:  '',
      body:     RichTextEditor.createEmptyValue(),
      fileList: []
    })
  }

  hideMailer = () => {
    this.resetValues()
    this.props.store.hideMailer()
  }

  sendEmail = () => {
    const { subject, body } = this.state

    this.props.store.sendEmail({
      subject, 
      body:      body.toString('html'),
      fileList:  this.state.fileList,
      onSuccess: this.onSuccess
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  getDraggerProps = () => ({
    action:   '/commo/email',
    multiple: true,
    onRemove: file => {
      this.setState(({ fileList }) => {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()

        newFileList.splice(index, 1)
        return {
          fileList: newFileList
        }
      })
    },
    beforeUpload: file => {
      this.setState(({fileList}) => {
        return {fileList: [...fileList, file]}
      })

      return false
    },
    fileList: this.state.fileList
  })

  handleOnTranslate = (isError, translatedText) => {
    if(isError) return

    this.setState({
      body: RichTextEditor.createValueFromString(translatedText, 'html')
    })
  }

  handleOnTranslating = (isTranslating) => {
    this.setState({isTranslating})
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
          <Form 
            className = 'p-3'
            style     = {{ borderBottom: '1px solid #eceeef' }}
            onSubmit  = {this.handleSubmit}
          >
            <FormGroup row>
              <Label sm={2} className='text-right font-weight-bold'>To:</Label>
              <Col sm={8} lg={9}>
                <Input value={store.name} readOnly />
              </Col>
              <Col sm={2} lg={1}>
                <Button
                  color     = 'info'
                  onClick   = {this.sendEmail}
                  className = 'w-100'
                  disabled  = {store.isSendingEmail || this.state.isTranslating}
                >
                  <span className='icon icon-paper-plane mr-2'/>
                  {store.isSendingEmail ? 'Sending...' : 'Send'}
                </Button>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className='text-right font-weight-bold'>Subject:</Label>
              <Col sm={10}>
                <Input value={this.state.subject} onChange={(e) => this.onSubjectChange(e)} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2} className='text-right font-weight-bold'>Attachments:</Label>
              <Col sm={10}>
                <Dragger {...this.getDraggerProps()}>
                  <p className='d-flex align-items-center justify-content-center'> 
                    <DragIcon type='inbox' /> 
                    <span className='ml-2'>Click or drag file to this area to attach</span> 
                  </p>
                </Dragger>
              </Col>
            </FormGroup>
          </Form>

          <div className='mailer-editor'>
            <RichTextEditor
              className     = 'border-0 bg-light rounded-0'
              autoFocus
              toolbarConfig = {rteToolbarConfig}
              value         = {this.state.body}
              onChange      = {this.onBodyChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          {userStore.user.hasChannel && (
            <TranslationContainer
              textToTranslate = {this.state.body.toString('html')}
              className       = 'mx-2'
              onTranslate     = {this.handleOnTranslate}
              onTranslating   = {this.handleOnTranslating}
              state           = {STATE.SELECT_ONLY}
              disabled        = {isEmptyHTML(this.state.body.toString('html'))}
            />
          )}
        </ModalFooter>
      </Modal>
    )
  }
}

const modalStyle = {
  overlay: {
    zIndex:          2000,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },

  content: {
    zIndex:  2001,
    width:   'calc(100vw-80px)',
    height:  'calc(100vh - 100px)',
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
