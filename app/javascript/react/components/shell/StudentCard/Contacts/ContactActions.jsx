import React        from 'react'
import { observer } from 'mobx-react'
import FavIcon      from './FavIcon'
import FlagIcon     from './FlagIcon'
import FlagNoteIcon from './FlagNoteIcon'
import FlagDropdown from './FlagDropdown'

const ContactActions = ({contact}) => (
  <div className = 'd-inline-flex justify-content-end align-items-center'>
    <FavIcon contact={contact} />    
    <FlagDropdown contact={contact}>
      <FlagIcon contact={contact} className='ml-2'/>
    </FlagDropdown>
    <FlagNoteIcon contact={contact} className={`${contact.flagged ? 'ml-3' : 'ml-2'}`}/>
  </div>
)

export default observer(ContactActions)
