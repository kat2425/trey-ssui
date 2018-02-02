import React from 'react'

const LoadingSpinner = ({className, center, style}) => {
  return (
    <div className={`loading-container ${centerStyle(center)} p-4 ${className}`} style={style}>
      <div className='loading'/>
    </div>
  )
}

const centerStyle = (isCenter) => isCenter ? 'd-flex flex-row justify-content-center' : ''

LoadingSpinner.defaultProps = {}

LoadingSpinner.propTypes = {}

export default LoadingSpinner
