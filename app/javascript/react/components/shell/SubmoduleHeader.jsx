import React from 'react'
import PropTypes from 'prop-types'

const SubmoduleHeader = ({title, children}) => {
  return (
    <div className='row mr-2 ml-1'>
      <div>
        <h4 className='ml-3 mb-3'>
          {title}
        </h4>
      </div>

      <div className='ml-auto' style={{display: 'flex'}}>
        {children}
      </div>
    </div>
  )
}

SubmoduleHeader.defaultProps = {}

SubmoduleHeader.propTypes = {}

export default SubmoduleHeader
