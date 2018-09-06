import React from 'react'

function Placeholder({children = 'N/A', ...rest}){
  return <div className='text-warning' {...rest}>{children}</div>
}

export default Placeholder
