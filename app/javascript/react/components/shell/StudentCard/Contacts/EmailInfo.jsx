import React        from 'react'
import { observer } from 'mobx-react'

const EmailInfo = ({ contacts }) => {
  return (
    <div className='d-flex flex-column'>
      {contacts.map(c => <Email key={c.id} contact={c} />)}
    </div>
  )
}

const Email = observer(({contact}) => (
  <div className='d-flex align-items-center'>
    <span className='icon icon-mail mr-2' />
    <span>{contact.email}</span>
  </div>
))

export default observer(EmailInfo)
