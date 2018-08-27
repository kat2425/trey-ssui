import React                   from 'react'
import { MdEventNote }         from 'react-icons/lib/md'
import contactStore            from 'stores/ContactStore'
import { UncontrolledTooltip } from 'reactstrap'

const FlagNoteIcon = ({contact, className = '', ...rest}) => {
  if(!contact.showContactFlagging || !contact.hasFlags) return null

  const tooltipId = `id-info-${contact.id}`

  return (
    <div 
      className = {`cursor-pointer ${className}`}
      onClick   = {() => handleOnInfoClick(contact)}
      {...rest}
    >
      <MdEventNote id={tooltipId} size={18}/>
      <UncontrolledTooltip
        placement = 'top'
        target    = {tooltipId}
      >
        <p>View flag notes</p>
      </UncontrolledTooltip>
    </div>
  )
}

const handleOnInfoClick = (contact) => {
  contactStore.setSelectedContact(contact)
  contactStore.toggleFlagNotesModal()
}

export default FlagNoteIcon
