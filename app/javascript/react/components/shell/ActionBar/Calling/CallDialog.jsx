import React        from 'react'
import { observer } from 'mobx-react'
import DetectRTC    from 'detectrtc'
import {
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, ButtonGroup,
  Collapse, Card, CardBlock
} from 'reactstrap'

const CallDialog = observer(({ callingStore }) => {
  const { 
    selectCall, 
    selectConferenceCall, 
    isConferenceCall, 
    contact, 
    studentID 
  } = callingStore

  return (
    <Modal style={{ zIndex: 99999 }} isOpen={selectCall}>
      <ModalHeader style={{ justifyContent: 'center' }}>Place a Call</ModalHeader>
      <ModalBody style={{ textAlign: 'center' }}>
        <ButtonGroup vertical>
          <Button
            style={{ marginBottom: 15 }}
            color="primary"
            onClick={() => handleWebCall(callingStore)}
          >
            Call Using My Computer (Free)
          </Button>
          <Button 
            color="secondary" 
            onClick={() => { isConferenceCall(!selectConferenceCall) }}
          >
            Call Using My Cell Phone
          </Button>
        </ButtonGroup>
        <Collapse isOpen={selectConferenceCall}>
          <Card className='mt-4'>
            <CardBlock>
              SchoolStatus will connect this call free of charge. We will call your chosen phone number, 
              then connect you to the above contact.This will not reveal your phone number. While the call
              is free to connect, your phone provider will treat this as any other incoming call and will 
              debit your minutes according to your phone plan. SchoolStatus nor your district/school are 
              responsible for these charges.
            </CardBlock>
            <CardBlock>
              <Button
                disabled={callingStore.isDisabled}
                onClick={() => callingStore.initiateConferenceCall(contact, studentID)}
                color="primary"
              >
                Proceed
              </Button>
            </CardBlock>
          </Card>
        </Collapse>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => handleCancel(callingStore)}
          color="secondary"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
})

function handleWebCall(store){
  if(!hasWebRTC(store)) return

  const { 
    isCall, 
    contact, 
    studentID 
  } = store

  isCall(false)
  store.initiateCall(contact, studentID)
}

function hasWebRTC(store) {
  if (!DetectRTC.isWebRTCSupported) {
    store.setIsError({
      title:   'WebRTC Unsupported', 
      message: 
        <div>
          <p>Your browser does not support WebRTC, which is required to make calls using our application. 
          Check this list of browsers that support WebRTC:</p>
          <a 
            target='_blank'
            href='https://support.twilio.com/hc/en-us/articles/223180848-Which-browsers-support-WebRTC-'
          >
            https://support.twilio.com/hc/en-us/articles/223180848-Which-browsers-support-WebRTC-
          </a>
        </div>
    })
    return false
  } else {
    return true
  }
}

function handleCancel(store) {
  const { 
    isCall, 
    isConferenceCall 
  } = store

  isCall(false)
  isConferenceCall(false)
}

export default CallDialog