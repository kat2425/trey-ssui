import React from 'react'

const LoadingSpinner = (props) => {
  return (
    <div className={`loading-container p-4 ${props.className}`}>
      <div className='loading'/>
    </div>
  )
}

LoadingSpinner.defaultProps = {}

LoadingSpinner.propTypes = {}

export default LoadingSpinner
