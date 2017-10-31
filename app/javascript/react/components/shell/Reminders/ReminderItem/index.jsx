import React              from 'react'
import moment             from 'moment'
import { ListGroupItem }  from 'reactstrap'
import { observer }       from 'mobx-react'

const ReminderItem = observer(({reminder, handleCheck, handleRemove, handleUndo}) => {
  return (
    <ListGroupItem 
      className = {reminder.status == 'complete' ? 'complete' : null}
      style     = {{ flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <div 
        style={{ 
          marginBottom:   15, 
          width:          '100%', 
          display:        'flex', 
          flexDirection:  'column', 
          justifyContent: 'space-between' 
        }}
      >
        <div style={{textAlign: 'right'}}>
          {reminder.status != 'complete' ?
            <span 
              onClick   = {() => handleCheck(reminder.id)} 
              style     = {{ alignSelf: 'flex-end', marginLeft: 10 }} 
              className = "icon icon-check reminder-check"
            >
            </span> : 
            <span 
              onClick   = {() => handleUndo(reminder.id)} 
              style     = {{ alignSelf: 'flex-end', marginLeft: 10 }} 
              className = "icon icon-back-in-time reminder-check"
            >
            </span>
          }
          <span 
            onClick   = {() => handleRemove(reminder.id)} 
            style     = {{ alignSelf: 'flex-end', marginLeft: 10 }} 
            className = "icon icon-trash reminder-check"
          >
          </span>
        </div>
        <p className='reminder-info' style={{ margin: 0 }}>{reminder.description}</p>
      </div>
      <div 
        className='reminder-info' 
        style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
      >
        <p style={{ alignSelf: 'flex-end', margin: 0, fontSize: '0.9em' }}>
          <span className='icon icon-clock' style={{color: 'darkgray'}}>{' '}</span>
          {reminder && reminder.date.length > 0 && moment(reminder.date).format('MMM DD YYYY h:mm A')}
        </p>
        <p style={{ alignSelf: 'flex-start', margin: 0, fontSize: '0.9em' }}>
          <span style={{ color: 'darkgray' }}>Student: </span> 
          {reminder.student.full_name}
        </p>
      </div>
    </ListGroupItem>
  )
})

export default ReminderItem
