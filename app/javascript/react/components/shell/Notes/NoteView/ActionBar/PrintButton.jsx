import React        from 'react'
import PropTypes    from 'prop-types'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

PrintButton.propTypes = {
  store: PropTypes.object.isRequired
}

function PrintButton({store}){
  return (
    <SSButton 
      onClick   = {() => store.handleOnPrint(true)}
      className = 'pl-2 mr-2'
      iconClass = 'icon icon-print'
    >
      Print 
    </SSButton>
  )
}

export default observer(PrintButton)
