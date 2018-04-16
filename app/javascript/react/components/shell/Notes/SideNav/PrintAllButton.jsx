import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import _isEmpty     from 'lodash/isEmpty'

function PrintAllButton({store}){
  if(_isEmpty(store.notes.values())) return null
  
  return (
    <div className='align-self-center'>
      <SSButton
        size      = 'sm'
        style     = {{height: 30}}
        loading   = {store.isPrinting}
        onClick   = {() => store.handleOnPrint(false)}
        iconClass = 'icon icon-print'
      >
        Print Notes
      </SSButton>
    </div>
  )
}

export default observer(PrintAllButton)
