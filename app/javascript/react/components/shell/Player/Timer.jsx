import React           from 'react'
import styled          from 'styled-components'
import PropTypes       from 'prop-types'
import TimeFormat      from 'helpers/TimeFormat'

Timer.propTypes = {
  currentTime: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number
  ]),
  duration: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number
  ]),
}
export default function Timer({duration = 0, currentTime = 0}){
  return (
    <Wrapper className='mr-3 d-flex align-items-center'>
      <Small>{TimeFormat.formatMSS(parseInt(currentTime))}</Small> 
      {!!duration && (
        <div className='d-flex align-items-center'>
          <Small className='px-1'>/</Small>
          <Small>{TimeFormat.formatMSS(parseInt(duration))}</Small>
        </div>
      )}
    </Wrapper>
  )
}

const Small = styled.small`
  font-size: 88%;
`
const Wrapper = styled.div.attrs({
  className: 'mr-3 d-flex align-items-center'
})`
 color: #505050;
 transition: 0.3 all;
`
