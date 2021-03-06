import React        from 'react'
import { observer } from 'mobx-react'
import FavIcon      from './FavIcon'
import FlagIcon     from './FlagIcon'
import FlagNoteIcon from './FlagNoteIcon'
import FlagDropdown from './FlagDropdown'

const ContactActions = ({contact, ...rest}) => (
  <div 
    className = 'd-inline-flex justify-content-end align-items-center' 
    {...rest}
  >
    <FavIcon contact={contact} />    
    <FlagDropdown contact={contact}>
      <FlagIcon contact={contact} className='ml-2'/>
    </FlagDropdown>
    <FlagNoteIcon 
      contact   = {contact}
      className = 'ml-2 mr-3'
    />
  </div>
)

export default observer(ContactActions)
