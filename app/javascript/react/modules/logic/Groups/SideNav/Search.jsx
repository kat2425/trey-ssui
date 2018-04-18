import React        from 'react'
import { observer } from 'mobx-react'
import { Input }    from 'antd'

function Search({groupStore}){
  return (
    <Input.Search
      size        = 'large'
      className   = 'my-3 px-3'
      placeholder = 'Find a group...'
      onChange    = {groupStore.handleGroupFilter}
    />
  )
}

export default observer(Search)
