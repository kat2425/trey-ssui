import React from 'react'

const Row = ({children, ...rest}) => <div className='d-flex flex-row' {...rest}>{children}</div>

export default Row
