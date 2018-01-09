import React                                                          from 'react'
import Datetime                                                       from 'react-datetime'
import StudentSearch                                                  from '../../StudentSearch'
import {Input, InputGroup, InputGroupAddon, InputGroupButton, Button} from 'reactstrap'
import Wrapper                                                        from './Wrapper'
import { observer }                                                   from 'mobx-react'

const ReminderForm = observer(({reminderStore}) => {
  return (
    <Wrapper>
      <div className='reminder-form' style={{ marginBottom: 10 }}>
        <InputGroup style={{ marginTop: 10, width: '100%' }}>
          <InputGroupAddon>
            <span className="icon icon-user"></span>
          </InputGroupAddon>
          <StudentSearch style={{ width: '100%' }} onChange={(e) => reminderStore.selectStudent(e)} dropup />
        </InputGroup>
        <InputGroup style={{ marginTop: 10 }}>
          <InputGroupAddon>
            <span className="icon icon-calendar"></span>
          </InputGroupAddon>
          <Datetime 
            onChange   = {(e)         => reminderStore.selectDateTime(e)} 
            inputProps = {{ placeholder: 'Pick a Date...' }} 
            input 
          />
        </InputGroup>
      </div>
      <InputGroup>
        <Input 
          placeholder = 'Add Reminder...' 
          value       = {reminderStore.reminderText} 
          onChange    = {(e)   => reminderStore.setReminderDesc(e.target.value)} 
          style       = {{ width: '100%' }} 
          type='text' 
        />
        <InputGroupButton>
          <Button onClick={() => { reminderStore.addReminder(reminderStore.reminderText) }}>
            <span className="icon icon-add-to-list"></span>
          </Button>
        </InputGroupButton>
      </InputGroup>
    </Wrapper>
  )
})

export default ReminderForm