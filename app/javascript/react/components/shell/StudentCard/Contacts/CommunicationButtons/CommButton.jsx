import React        from 'react'
import { observer } from 'mobx-react'
import SSButton     from 'ui/shell/SSButton'

const CommButton = ({label, ...rest}) => {
  return (
    <div className='d-inline-flex flex-column justify-content-center align-items-center mr-2'>
      <SSButton size='lg' {...rest} />
      <span className='small mt-1'>{label}</span>
    </div>
  )
}

export default observer(CommButton)
