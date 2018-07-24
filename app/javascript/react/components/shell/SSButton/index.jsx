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
  iconStyle = { marginRight: '4px' },
  ...props
}) => {
  const _id = id || `button-${uuid()}`
  const _iconStyle = props.children ? iconStyle : { marginRight: 0 }

  return (
    <React.Fragment>
      <Button {...props} disabled={disabled || loading} id={_id}>
        {loading ? (
          <Icon style={iconStyle} type="loading" />
        ) : iconClass
          ?  <span
            style={{ ..._iconStyle, color: 'inherit' }}
            className={iconClass}
          />
          : null
        }
        {props.children}
      </Button>

      {tooltip && (
        <UncontrolledTooltip placement={placement} target={_id}>
          {tooltip}
        </UncontrolledTooltip>
      )}
    </React.Fragment>
  )
}

export default SSButton
