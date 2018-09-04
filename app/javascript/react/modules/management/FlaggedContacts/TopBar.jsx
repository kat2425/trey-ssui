import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'
import Search       from './Search'

const TopBar = ({store}) => ( 
  <div className='mb-4 d-flex justify-content-between align-items-center'>
    <UnFlagAllButton store={store} />
    <Search store={store} style={{width: '50%'}}/>
    <SSButton 
      iconClass = 'icon icon-cw'
      disabled  = {store.isLoading}
      onClick   = {store.fetchFlaggedContacts}
    >
      Reload
    </SSButton>
  </div>
)

const UnFlagAllButton = observer(({store}) => (
  <div className='d-inline-flex align-items-center'>
    <SSButton
      color    = 'primary'
      onClick  = {store.handleOnUnflagSelectedContacts}
      disabled = {!store.hasSelected}
    >
      Unflag All Selected {getSelectedCount(store)}
    </SSButton>
  </div>
))

const getSelectedCount = (store) => store.hasSelected ? `[ ${store.selectedRowKeys.length} ]` : ''


export default observer(TopBar)
