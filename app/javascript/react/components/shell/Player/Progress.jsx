import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import {prop}    from 'styled-tools'
import toNumber  from 'lodash.tonumber'

Progress.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  size:  PropTypes.string, // rem
  color: PropTypes.string
}

export default function Progress({value = 0, max = 100, color, size, className, barClassName}){
  const percent = ((toNumber(value) / toNumber(max)) * 100)

  return (
    <ProgressWrapper className={className}>
      <Bar 
        className={barClassName}
        value={percent}
        color={color} 
        size={size}
        aria-valuenow={toNumber(value)}
        aria-valuemin={0}
        aria-valuemax={toNumber(max)}
        style={{width:`${percent}%`}}
      />
    </ProgressWrapper>
  )
}

const ProgressWrapper = styled.div.attrs({
  className: ({className}) => className ? `progress ${className}` : 'progress'
})`
 flex: 1;
 background-color: #eaeaea;
`

const Bar = styled.div.attrs({
  className: ({className}) => className ? `progress-bar ${className}` : 'progress-bar'
})`
  height: ${prop('size', '0.2rem')};
  line-height: ${prop('size', '0.2rem')};
  background-color: ${prop('color', '#397af2')};
`

