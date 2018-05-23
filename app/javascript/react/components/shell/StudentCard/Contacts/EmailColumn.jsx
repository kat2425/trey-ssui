import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

const EmailColumn = ({contactsWithUniqueEmails = []}) => (
  <td> {contactsWithUniqueEmails.map(c => <Email key={c.id} contact={c} />)} </td>
)

const Email = observer(({contact}) => ( 
  <div className='mb-1'>
    <SSButton
      size      = 'sm'
      color     = 'info'
      className = 'mr-2'
      iconClass = 'icon icon-mail'
      onClick   = {contact.initiateEmail}
    />
    {contact.email}
  </div>
))

export default observer(EmailColumn)
