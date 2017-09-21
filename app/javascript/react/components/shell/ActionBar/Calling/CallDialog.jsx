import React from 'react'
import { observer } from 'mobx-react'
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
    isCall, 
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
            onClick={() => { isCall(false); callingStore.initiateCall(contact, studentID) }}
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
              SchoolStatus will connect this call free of charge. We will call your chosen phone number, then connect you to the above contact.
                  This will not reveal your phone number.While the call is free to connect, your phone provider will treat this as any other incoming
                  call and will debit your minutes according to your phone plan. SchoolStatus nor your district/school are responsible for these charges.
            </CardBlock>
            <CardBlock>
              <Button
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
          onClick={() => { isCall(false); isConferenceCall(false) }}
          color="secondary"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
})

export default CallDialog