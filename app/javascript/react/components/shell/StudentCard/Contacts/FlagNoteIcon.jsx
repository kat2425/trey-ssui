import React                   from 'react'
import { observer }            from 'mobx-react'
import { MdEventNote }         from 'react-icons/lib/md'
import contactStore            from 'stores/ContactStore'
import { UncontrolledTooltip } from 'reactstrap'
import { Badge }               from 'antd'
import styled                  from 'styled-components'
import { ifProp }              from 'styled-tools'

const FlagNoteIcon = ({contact, className = '', ...rest}) => {
  if(!contact.showContactFlagging) return null

  const tooltipId = `id-info-${contact.id}`

  return (
    <div 
      className = {`cursor-pointer ${className}`}
      onClick   = {handleOnInfoClick(contact)}
      {...rest}
    >
      <Badge 
        count = {contact.flagsCount}
        title = 'Flag count'
      >
        <NoteIcon disabled={!contact.hasFlags} id={tooltipId} size={18}/>
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

const handleOnInfoClick = (contact) => e => {
  if(!contact.hasFlags) {
    e.preventDefault()
    return
  }

  contactStore.setSelectedContact(contact)
  contactStore.toggleFlagNotesModal()
}

const NoteIcon = styled(MdEventNote)`
  ${ifProp('disabled', `
    opacity: 0.55;
    cursor: not-allowed;
  `)}  
`

export default observer(FlagNoteIcon)
