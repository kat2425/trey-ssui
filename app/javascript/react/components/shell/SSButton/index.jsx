import React      from 'react'
import { Button } from 'reactstrap'
import { Icon }   from 'antd'

const SSButton = ( {loading, iconClass, disabled, ...props} ) => {
  const iconStyle = {
    marginRight: '4px'
  }

  return (
    <Button {...props} disabled={disabled || loading}>
      { loading
        ? <Icon style={iconStyle} type='loading' />
        : <span style={iconStyle} className={iconClass} /> }
      { props.children }
    </Button>
  )
}

export default SSButton
