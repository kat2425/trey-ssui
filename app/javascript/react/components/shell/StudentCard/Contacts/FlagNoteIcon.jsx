import React                   from 'react'
import { observer }            from 'mobx-react'
import { MdEventNote }         from 'react-icons/lib/md'
import contactStore            from 'stores/ContactStore'
import { UncontrolledTooltip } from 'reactstrap'
import { Badge }               from 'antd'

const FlagNoteIcon = ({contact, className = '', ...rest}) => {
  if(!contact.showContactFlagging || !contact.hasFlags) return null

  const tooltipId = `id-info-${contact.id}`

  return (
    <div 
      className = {`cursor-pointer ${className}`}
      onClick   = {() => handleOnInfoClick(contact)}
      {...rest}
    >
      <Badge 
        count = {contact.flagsCount}
        title = 'Flag count'
      >
        <MdEventNote id={tooltipId} size={18}/>
      </Badge>
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

export default observer(FlagNoteIcon)
