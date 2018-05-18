import React        from 'react'
import { observer } from 'mobx-react'
import DetectRTC    from 'detectrtc'
import {
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, ButtonGroup,
  Collapse, Card, CardBody
} from 'reactstrap'

const CallDialog = observer(({ callingStore }) => {
  const { 
    cancelCallSelection,
    showCallDialog,
    isCellSelected, 
    contact, 
    studentID 
  } = callingStore

  return (
    <Modal style={{ zIndex: 99999 }} isOpen={showCallDialog}>
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
            onClick={() => callingStore.setIsCellSelected(!isCellSelected)}
          >
            Call Using My Cell Phone
          </Button>
        </ButtonGroup>
        <Collapse isOpen={isCellSelected}>
          <Card className='mt-4'>
            <CardBody>
              SchoolStatus will connect this call free of charge. We will call your chosen phone number, 
              then connect you to the above contact.This will not reveal your phone number. While the call
              is free to connect, your phone provider will treat this as any other incoming call and will 
              debit your minutes according to your phone plan. SchoolStatus nor your district/school are 
              responsible for these charges.
            </CardBody>
            <CardBody>
              <Button
                disabled={callingStore.isDisabled}
                onClick={() => callingStore.initiateCellCall(contact, studentID)}
                color="primary"
              >
                Proceed
              </Button>
            </CardBody>
          </Card>
        </Collapse>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={cancelCallSelection}
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
    contact, 
    studentID 
  } = store

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

export default CallDialog