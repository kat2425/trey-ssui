import React from 'react'
import PropTypes from 'prop-types'

const SubmoduleHeader = ({title, children}) => {
  return (
    <div className='row mr-3 ml-1 mt-3'>
      <div>
        <h4 className='m-1 mb-3'>
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
