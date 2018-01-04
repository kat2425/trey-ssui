import React        from 'react'
import { observer } from 'mobx-react'

function ModifiedIndicator({children, tag, renderIndicator}){
  const show = !tag.isNew && tag.isModified
  const indicator = renderIndicator ? renderIndicator() : <span>*</span>

  return (
    <span>{children}&nbsp;{show && indicator} </span>
  )
}

export default observer(ModifiedIndicator)
