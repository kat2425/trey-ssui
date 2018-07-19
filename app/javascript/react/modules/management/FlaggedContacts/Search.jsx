import React        from 'react'
import { observer } from 'mobx-react'
import { Input }    from 'antd'

function Search({store, ...rest}){
  return (
    <Input.Search
      placeholder = 'Find a contact...'
      onChange    = {store.handleSearchFilter}
      {...rest}
    />
  )
}

export default observer(Search)
