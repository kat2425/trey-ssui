import React                   from 'react'
import PropTypes               from 'prop-types'
import { observer }            from 'mobx-react'
import SSButton                from 'ui/shell/SSButton'

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

function CancelButton(){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {this.props.onClick}
      iconClass = 'icon icon-circle-with-cross'
    >
      Cancel
    </SSButton>
  )
}

export default observer(CancelButton)
