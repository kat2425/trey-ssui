import React                 from 'react'
import { observer }          from 'mobx-react'

import NameColumn            from './NameColumn'
import PhoneColumn           from './PhoneColumn'
import EmailColumn           from './EmailColumn'
import RelationshipColumn    from './RelationshipColumn'
import { getUniqueContacts } from './helpers'

function TRow({contact}){
  const {
    contactsWithUniqueEmails,
    contactsWithUniquePhones,
    contact: _contact
  } = getUniqueContacts(contact)

  return (
    <tr>
      <NameColumn contact={_contact} />
      <RelationshipColumn contact={_contact} />
      <PhoneColumn contactsWithUniquePhones={contactsWithUniquePhones} />
      <EmailColumn contactsWithUniqueEmails={contactsWithUniqueEmails} />
    </tr>
  ) 
}

export default observer(TRow)
