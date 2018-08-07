import React   from 'react'

const getColumns = () => [
  {
    title:  'Name',
    key:    'name',
    render: (text, { parentUser }) => (
      <div key={parentUser.id}>
        <div>{parentUser.fullName}</div>
      </div>
    )
  },
  {
    title:  'Phone',
    key:    'phone',
    render: (text, { parentUser }) => (
      <p key={parentUser.id}>{parentUser.mobileNumber}</p>
    )
  },
  {
    title:  'Email',
    key:    'email',
    render: (text, { parentUser }) => (
      <p key={parentUser.id}>{parentUser.username}</p>
    )
  }
]

export default getColumns
