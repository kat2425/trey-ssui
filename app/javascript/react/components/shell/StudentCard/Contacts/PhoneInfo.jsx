import React          from 'react'
import { observer }   from 'mobx-react'
import PhoneNumber    from './PhoneNumber'
import ContactActions from './ContactActions'
import renderIf       from 'ui/hoc/renderIf'

const EContactActions = renderIf(ContactActions)

const PhoneInfo = ({ contacts, userStore }) => {
  return (
    <div className="d-flex flex-column">
      {contacts.map((c, i) => (
        <PhoneWrapper
          key       = {c.id}
          contact   = {c}
          last      = {contacts.length > 1 && i === contacts.length - 1}
          userStore = {userStore}
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

const PhoneWrapper = observer(({contact, last, userStore}) => (
  <div className={`d-flex justify-content-between align-items-center ${last ? 'mb-1' : 'mb-2'}`}>
    <Phone contact={contact} />
    <EContactActions contact={contact} renderIf={!userStore.isParent}/>
  </div>
))

export default observer(PhoneInfo)
