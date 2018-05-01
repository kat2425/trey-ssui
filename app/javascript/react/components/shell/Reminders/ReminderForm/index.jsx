import React                                        from 'react'
import Datetime                                     from 'react-datetime'
import StudentSearch                                from '../../StudentSearch'
import {Input, InputGroup, InputGroupAddon, Button} from 'reactstrap'
import Wrapper                                      from './Wrapper'
import { observer }                                 from 'mobx-react'

const ReminderForm = observer(({reminderStore}) => {
  return (
    <Wrapper>
      <div className='reminder-form' style={{ marginBottom: 10 }}>
        <InputGroup className='reminder-student-search-container'>
          <StudentSearch style={{width: '100%'}} onChange={(e) => reminderStore.selectStudent(e)} dropup />
        </InputGroup>
        <InputGroup style={{ marginTop: 10 }}>
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
        <InputGroupAddon addonType='append'>
          <Button
            className="icon icon-add-to-list"
            onClick={() => { reminderStore.addReminder(reminderStore.reminderText) }}
          >
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Wrapper>
  )
})

export default ReminderForm