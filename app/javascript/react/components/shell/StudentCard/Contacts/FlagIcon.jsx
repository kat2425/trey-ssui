import React                          from 'react'
import { observer }                   from 'mobx-react'
import { UncontrolledTooltip }        from 'reactstrap'
import { Icon, Badge }                from 'antd'

const FlagIcon = ({contact, className, placement = 'top', ...rest}) => (
  <span className={className}>
    {contact.isFlagging 
      ? <Icon type='loading'/> 
      : <Flag contact={contact} placement={placement} {...rest}/>
    }
  </span>
)

const flaggedIconStyle = ({flagged}) => {
  const minOpacity = 0.5
  const maxOpacity = 0.8

  return {
    fontSize:      17,
    verticalAlign: 'middle',
    opacity:       flagged ? maxOpacity : minOpacity
  }
}

const Flag = observer(({contact, placement, ...rest}) => {
  const {flagsCount, flagged, id, showContactFlagging} = contact
  const tooltipId                 = `id-flag-${id}`
  const colorClass                = flagged ? 'text-danger' : 'text-muted'

  if(!showContactFlagging) return null

  return (
    <div className='d-inline-block'{...rest} >
      <Badge 
        count     = {flagsCount}
        title     = 'Flag count'
      >
        <span
          id        = {tooltipId}
          className = {`icon icon-flag cursor-pointer ${colorClass}`}
          style     = {flaggedIconStyle(contact)}
        />
      </Badge>
      <UncontrolledTooltip
        placement = {placement}
        target    = {tooltipId}
      >
        <p>This number has been flagged as inactive. You may still attempt to contact the number</p>
      </UncontrolledTooltip>
    </div>
  )
})

export default observer(FlagIcon)
