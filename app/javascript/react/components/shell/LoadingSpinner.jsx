import React from 'react'

const LoadingSpinner = ({className, center, containerStyle, spinnerStyle, padding}) => {
  const _padding = `p-${padding}`

  return (
    <div
      className = {`loading-container ${centerStyle(center)} ${_padding} ${className}`}
      style     = {containerStyle}
    >
      <div className='loading' style={spinnerStyle}/>
    </div>
  )
}

const centerStyle = (isCenter) => isCenter ? 'd-flex flex-row justify-content-center' : ''

LoadingSpinner.defaultProps = {
  padding: 4
}

LoadingSpinner.propTypes = {}

export default LoadingSpinner
