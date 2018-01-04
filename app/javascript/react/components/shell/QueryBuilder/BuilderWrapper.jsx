import React        from 'react'
import { Builder }  from 'react-awesome-query-builder'
import { observer } from 'mobx-react'

function BuilderWrapper(props) {
  return (
    <div className='query-builder' className='m-0'>
      <Builder {...props} />
    </div>
  )
}

export default observer(BuilderWrapper)
