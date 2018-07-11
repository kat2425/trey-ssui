import React         from 'react'
import { observer }  from 'mobx-react'
import SSButton      from 'ui/shell/SSButton'
import Search        from './Search'

const TopBar = ({store}) => (
  <div className='mb-4 d-flex justify-content-between align-items-center'>
    <Search store={store} style={{width: '37.5%'}}/>
    <SSButton
      iconClass = 'icon icon-cw'
      disabled  = {store.isLoading}
      onClick   = {store.fetchParentValidations}
    >
      Reload
    </SSButton>
  </div>
)

export default observer(TopBar)
