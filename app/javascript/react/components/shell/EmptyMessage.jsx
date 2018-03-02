import React from 'react'

const renderMessage = (message) => {
  if (message) {
    return (
      <p className='mt-4'>{ message }</p>
    )
  }
}

const EmptyMessage = ({title, icon, children}) => {
  return (
    <div className='empty-message-container'>
      <div className='text-center'>
        <h1 style={{fontSize: '48px'}}>
          <span className={`icon icon-${ icon }`}/>
        </h1>

        <h4>{ title }</h4>

        { renderMessage(children) }
      </div>
    </div>
  )
}

export default EmptyMessage
