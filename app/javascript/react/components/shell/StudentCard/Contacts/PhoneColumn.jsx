import React           from 'react'
import { observer }    from 'mobx-react'

import ContactActions  from './ContactActions'
import PhoneNumber     from './PhoneNumber'
import SSButton        from 'ui/shell/SSButton'

import { ButtonGroup } from 'reactstrap'

const PhoneColumn = ({contactsWithUniquePhones = []}) => (
  <td> {contactsWithUniquePhones.map(c => <Phone key={c.id} contact={c} />)} </td>
)

const Phone = observer(({contact}) => (
  <div className='mb-1 d-flex align-items-center'>
    <ContactActions contact={contact} />
    <ButtonGroup className='mx-2'>
      <SSButton
        onClick = {contact.initiateCall}
        size      = 'sm'
        color     = 'success'
        iconClass = 'icon icon-phone'
        disabled  = {contact.stopped}
      />

      <SSButton
        size      = 'sm'
        iconClass = 'icon icon-chat'
        color     = 'primary'
        loading   = {contact.isFetchingNumCapability}
        disabled  = {contact.isTextingDisabled}
        onClick   = {contact.initiateText}
      />
    </ButtonGroup>
    <PhoneNumber contact={contact} />
  </div>
))

export default observer(PhoneColumn)
