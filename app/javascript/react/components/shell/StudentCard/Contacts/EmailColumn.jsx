import React                from 'react'
import _                    from 'lodash'
import { inject, observer } from 'mobx-react'
import renderIf             from 'ui/hoc/renderIf'
import SSButton             from 'ui/shell/SSButton'
import Placeholder          from './Placeholder'

const ESSButton = renderIf(SSButton)

const EmailColumn = ({contactsWithUniqueEmails = []}) => {
  if(_.isEmpty(contactsWithUniqueEmails)) return <td><Placeholder /></td>

  return (
    <td> {contactsWithUniqueEmails.map(c => <Email key={c.id} contact={c} />)} </td>
  )
}

const Email = inject('userStore')(observer(({userStore, contact}) => ( 
  <div className='mb-1'>
    <ESSButton
      size      = 'sm'
      color     = 'info'
      className = 'mr-2'
      iconClass = 'icon icon-mail'
      onClick   = {contact.initiateEmail}
      style     = {{backgroundColor: 'rgb(159, 109, 176)', borderColor: 'rgb(159, 109, 176)'}}
      renderIf  = {!userStore.isParent}
    />
    {contact.email}
  </div>
)))

export default observer(EmailColumn)
