import React from 'react'

const Column = ({children, ...rest}) => <div className='ml-2 d-flex flex-column' {...rest}>{children}</div>

export default Column
