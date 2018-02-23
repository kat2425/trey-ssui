import React from 'react'

const EmptyMessage = ({title, icon, children}) => {
  return (
    <div className='text-center align-middle empty-message-container'>
      <h1 style={{fontSize: '48px'}}>
        <span className={`icon icon-${ icon }`}/>
      </h1>

      <h4>{ title }</h4>

      <center>
        <p className='text-center mt-4 w-50'>
          { children }
        </p>
      </center>
    </div>
  )
}

export default EmptyMessage
