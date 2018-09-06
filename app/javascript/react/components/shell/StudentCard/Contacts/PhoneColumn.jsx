import React            from 'react'
import _                from 'lodash'
import { observer }     from 'mobx-react'

import ContactActions   from './ContactActions'
import PhoneNumber      from './PhoneNumber'
import SSButton         from 'ui/shell/SSButton'
import renderIf         from 'ui/hoc/renderIf'
import Placeholder      from './Placeholder'

import { ButtonGroup }  from 'reactstrap'

const EContactActions = renderIf(ContactActions)
const EButtonGroup = renderIf(ButtonGroup)

const PhoneColumn = ({contactsWithUniquePhones = [], userStore}) => {
  if(_.isEmpty(contactsWithUniquePhones)) return <td><Placeholder /></td>

  return (
    <td> {contactsWithUniquePhones.map(c => <Phone key={c.id} contact={c} userStore={userStore} />)} </td>
  )
}

const Phone = observer(({contact, userStore}) => (
  <div className='mb-1 d-flex align-items-center'>
    <EContactActions contact={contact} renderIf={!userStore.isParent} />
    <EButtonGroup className='mx-2' renderIf={!userStore.isParent}>
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
    </EButtonGroup>
    <PhoneNumber contact={contact} />
  </div>
))

export default observer(PhoneColumn)
