import React   from 'react'
import Actions from './InvitedActions'

const getInvitedColumns = () => [
  {
    title:  'First Name',
    key:    'firstName',
    render: (text, { validation }) => (
      <div key={validation.id}>
        <div>{validation.firstName}</div>
      </div>
    )
  },
  {
    title:  'Last Name',
    key:    'lastName',
    render: (text, { validation }) => (
      <div key={validation.id}>
        <div>{validation.lastName}</div>
      </div>
    )
  },
  {
    title:  'Phone',
    key:    'phone',
    render: (text, { validation }) => (
      <p key={validation.id}>{validation.phone}</p>
    )
  },
  {
    title:  'Email',
    key:    'email',
    render: (text, { validation }) => (
      <p key={validation.id}>{validation.email}</p>
    )
  },
  {
    title:  'Action',
    key:    'action',
    render: (text, { validation }) => <Actions validation={validation}/>
  }
]

export default getInvitedColumns
