import React from 'react'

const LoadingSpinner = ({className, center}) => {
  return (
    <div className={`loading-container p-4 ${centerStyle(center)} ${className}`}>
      <div className='loading'/>
    </div>
  )
}

const centerStyle = (isCenter) => isCenter ? 'd-flex flex-row justify-content-center' : ''

LoadingSpinner.defaultProps = {}

LoadingSpinner.propTypes = {}

export default LoadingSpinner
