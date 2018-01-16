import React        from 'react'
import { observer } from 'mobx-react'
import { Input }    from 'antd'

function Search({tagStore}){
  return (
    <Input.Search 
      size        = 'large'
      className   = 'my-3 px-2'
      placeholder = 'Filter tags'
      onChange    = {tagStore.handleTagFilter}
    />
  )
}

export default observer(Search)
