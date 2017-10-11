import 'rc-slider/assets/index.css'

import React     from 'react'
import PropTypes from 'prop-types'
import RcSlider  from 'rc-slider'

Slider.propTypes = {
  onChange: PropTypes.func,
}
export default function Slider({onChange, ...rest}) {
  return (
    <RcSlider
      style       = {{height: 12}}
      onChange    = {onChange}
      trackStyle  = {{backgroundColor: '#397af2', height: '2px' }}
      handleStyle = {{backgroundColor: '#397af2', width: 12, height: 12, border: '0'}}
      railStyle   = {{backgroundColor: '#505050', height: '2px' }}
      {...rest}
    />
  )
}
