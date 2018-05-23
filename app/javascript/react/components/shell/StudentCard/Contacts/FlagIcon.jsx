import React                          from 'react'
import { observer }                   from 'mobx-react'
import { UncontrolledTooltip }        from 'reactstrap'
import { Icon, Badge }                from 'antd'
import contactStore                   from 'stores/ContactStore'

const FlagIcon = ({contact, className, placement = 'top'}) => (
  <span className={className}>
    {contact.isFlagging 
      ? <Icon type='loading'/> 
      : <Flag contact={contact} placement={placement}/>
    }
  </span>
)

const flaggedIconStyle = ({flagged}) => {
  const minOpacity = 0.15
  const maxOpacity = 0.8

  return {
    fontSize:      17,
    verticalAlign: 'middle',
    opacity:       flagged ? maxOpacity : minOpacity
  }
}

const Flag = ({contact, placement}) => {
  const {flagsCount, flagged, id} = contact
  const tooltipId                 = `id-flag-${id}`
  const colorClass                = flagged ? 'text-danger' : 'text-muted'

  return (
    <div className='d-inline-block'>
      <Badge 
        count     = {flagsCount}
        title     = 'Flag count'
      >
        <span
          id        = {tooltipId}
          onClick   = {handleOnFlagClick(contact)}
          className = {`icon icon-flag cursor-pointer ${colorClass}`}
          style     = {flaggedIconStyle(contact)}
        />
      </Badge>
      <UncontrolledTooltip
        placement = {placement}
        target    = {tooltipId}
      >
        <p>Report number as inactive.</p>
      </UncontrolledTooltip>
    </div>
  )
}

const handleOnFlagClick = (contact) => () => {
  contactStore.setSelectedContact(contact)
  contactStore.toggleFlagFormModal()
}

export default observer(FlagIcon)
