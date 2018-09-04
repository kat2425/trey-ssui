import React   from 'react'
import Actions from './InvitedActions'

const getInvitedColumns = () => [
  {
    title:  'Name',
    key:    'name',
    render: (text, { potentialUser }) => (
      <div key={potentialUser.id}>
        <div>{potentialUser.firstName} {potentialUser.lastName}</div>
      </div>
    )
  },
  {
    title:  'Phone',
    key:    'phone',
    render: (text, { potentialUser }) => (
      <p key={potentialUser.id}>{potentialUser.phone}</p>
    )
  },
  {
    title:  'Email',
    key:    'email',
    render: (text, { potentialUser }) => (
      <p key={potentialUser.id}>{potentialUser.email}</p>
    )
  },
  {
    title:  'Action',
    key:    'action',
    render: (text, { potentialUser }) => (
      <Actions potentialUser={potentialUser}/>
    )
  }
]

export default getInvitedColumns
