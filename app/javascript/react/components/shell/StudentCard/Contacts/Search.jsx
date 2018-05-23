import React        from 'react'
import { observer } from 'mobx-react'
import { Input }    from 'antd'

function Search({contactStore, ...rest}){
  return (
    <Input.Search
      placeholder = 'Find a contact...'
      onChange    = {contactStore.handleSearchFilter}
      {...rest}
    />
  )
}

export default observer(Search)
