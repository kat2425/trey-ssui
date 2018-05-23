import React   from 'react'
import Avatar  from './Avatar'
import Actions from './Actions'

const getColumns = store => [
  {
    title:  'Name',
    render: (text, {contact}) => (
      <Avatar id={contact.id} name={contact.name}/>
    )
  },
  {
    title:  'Relationship',
    render: (text, {contact}) => (
      <p>{contact.relationship}</p>
    )
  },
  {
    title:  'Student',
    render: (text, {contact}) => (
      <Avatar 
        id        = {contact.studentId}
        name      = {contact.studentFullName}
        onClick   = {contact.openStudentCard}
        isContact = {false}
      />  
    )
  },
  {
    title:  'Action',
    key:    'action',
    render: (text, {contact}) => (
      <Actions contact={contact} store={store}/>
    )
  }
]

export default getColumns
