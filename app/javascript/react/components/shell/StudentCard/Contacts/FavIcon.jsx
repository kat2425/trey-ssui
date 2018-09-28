import React                   from 'react'
import { observer }            from 'mobx-react'
import { UncontrolledTooltip } from 'reactstrap'
import { Icon }                from 'antd'

const FaveIcon = ({contact, className}) => (
  <span className={className}>
    {contact.isUpdatingContactPrimary 
      ? <Icon type='loading' className='mr-2' /> 
      : <Star contact={contact} />
    }
  </span>
)

const faveIconStyle = (primary) => {
  return {
    fontSize:      18,
    verticalAlign: 'middle',
    color:         primary ? 'goldenrod' : '#A8ADB0',
    lineHeight:    '1px'
  }
}

const Star = ({contact}) => {
  const {primary, id, updateContactPrimary} = contact
  const tooltipId = `id-fav-${id}`
  const className = `icon icon-star cursor-pointer`

  return (
    <React.Fragment>
      <span
        id        = {tooltipId}
        onClick   = {() => updateContactPrimary()}
        className = {className}
        style     = {faveIconStyle(primary)}
      />
      <UncontrolledTooltip
        placement = 'top'
        target    = {tooltipId}
      >
        <p>Mark as primary contact</p>
      </UncontrolledTooltip>
    </React.Fragment>
  )
}

export default observer(FaveIcon)
