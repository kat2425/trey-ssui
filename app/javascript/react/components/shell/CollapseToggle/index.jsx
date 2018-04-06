import React     from 'react'
import PropTypes from 'prop-types'

CollapseToggle.propTypes = {
  onClick:     PropTypes.func,
  isCollapsed: PropTypes.bool
}

export default function CollapseToggle({ onClick, isCollapsed }) {
  const message = isCollapsed ? 'Show More'          : 'Show Less'
  const icon    = isCollapsed ? 'icon-triangle-down' : 'icon-triangle-up'

  return (
    <div onClick={onClick} className="text-center cursor-pointer" style={{opacity: '0.9'}}>
      <small>{ message } <span className={`icon ${icon}`}></span></small>
    </div>
  )
}
