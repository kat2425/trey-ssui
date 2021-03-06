import React     from 'react'

const ModuleHeader = ({title, children}) => {
  return (
    <div className='row mr-2 ml-1' style={{paddingTop: '12px'}}>
      <div>
        <h2 className='ml-3 mb-3'>
          {title}
        </h2>
      </div>

      <div className='ml-auto' style={{display: 'flex'}}>
        {children}
      </div>
    </div>
  )
}

export default ModuleHeader
