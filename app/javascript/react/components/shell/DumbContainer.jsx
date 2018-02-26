import React from 'react'

const DumbContainer = ({title, children}) => {
  const dumbStyle = {
    backgroundColor: 'white',
    border:          '1px solid #c3c3c3',
    boxShadow:       '0 2px 10px rgba(0,0,0,0.125)'
  }

  return (
    <div>
      <h3 className='ml-4 mr-4 mt-3 mb-3'>{ title }</h3>

      <div className='ml-4 mr-4 mb-5 p-3' style={ dumbStyle }>
        { children }
      </div>
    </div>
  )
}

export default DumbContainer
