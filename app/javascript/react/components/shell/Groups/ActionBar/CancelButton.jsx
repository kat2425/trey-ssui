import React                   from 'react'
import PropTypes               from 'prop-types'
import { observer }            from 'mobx-react'
import SSButton                from 'ui/shell/SSButton'

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

function CancelButton({onClick}){
  return (
    <SSButton
      className = 'btn btn-secondary mr-2'
      onClick   = {onClick}
      iconClass = 'icon icon-circle-with-cross'
    >
      Cancel
    </SSButton>
  )
}

export default observer(CancelButton)
