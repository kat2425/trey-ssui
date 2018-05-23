import React          from 'react'
import { observer }   from 'mobx-react'
import PhoneNumber    from './PhoneNumber'
import ContactActions from './ContactActions'

const PhoneInfo = ({ contacts }) => {
  return (
    <div className="d-flex flex-column">
      {contacts.map((c, i) => (
        <PhoneWrapper
          key     = {c.id}
          contact = {c}
          last    = {contacts.length > 1 && i === contacts.length - 1}
        />
      ))}
    </div>
  )
}

const Phone = observer(({contact}) => (
  <div key={contact.id} className='d-flex align-items-center'>
    <span className='icon icon-phone mr-2' />
    <PhoneNumber contact={contact} className='text-truncate'/>
  </div>
))

const PhoneWrapper = observer(({contact, last}) => (
  <div className={`d-flex justify-content-between align-items-center ${last ? 'mb-1' : 'mb-2'}`}>
    <Phone contact={contact} />
    <ContactActions contact={contact} />
  </div>
))

export default observer(PhoneInfo)
