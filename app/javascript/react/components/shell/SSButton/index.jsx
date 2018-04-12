import React                   from 'react'
import { Button }              from 'reactstrap'
import { Icon }                from 'antd'
import { UncontrolledTooltip } from 'reactstrap'
import uuid                    from 'uuid'

const SSButton = ({
  id,
  loading,
  iconClass,
  disabled,
  tooltip,
  placement = 'top',
  ...props
}) => {
  const iconStyle = {
    marginRight: '4px'
  }

  const _id = id || `button-${uuid()}`

  return (
    <span>
      <Button {...props} disabled={disabled || loading} id={_id}>
        {loading 
          ? <Icon style={iconStyle} type="loading" />
          : <span style={{ ...iconStyle, color: 'inherit' }} className={iconClass} /> }
        {props.children}
      </Button>

      {tooltip && (
        <UncontrolledTooltip placement={placement} target={_id}>
          {tooltip}
        </UncontrolledTooltip>
      )}
    </span>
  )
}

export default SSButton
