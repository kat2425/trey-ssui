import React from 'react'
import PropTypes from 'prop-types'


Time.propTypes = {
  primary:   PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
}

export default function Time({primary, secondary}) {
  return (
    <small className='text-muted mt-1'>
      {primary}
      <em>
        <span className='ml-2' style={{opacity: '0.75'}}>
          ( {secondary} )
        </span>
      </em>
    </small>
  )
}
