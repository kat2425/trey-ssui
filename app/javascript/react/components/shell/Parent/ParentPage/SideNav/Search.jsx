import React        from 'react'
import { observer } from 'mobx-react'
import { Input }    from 'antd'

function Search({store}){
  return (
    <Input.Search
      size        = 'large'
      className   = 'my-3 px-3'
      placeholder = 'Find a student...'
      onChange    = {({target}) => store.setFilter(target.value)}
    />
  )
}

export default observer(Search)
