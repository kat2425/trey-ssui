import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import {ifProp}  from 'styled-tools'

const Small = styled.small`
  display: block;
  white-space: normal;

  ${ifProp('nowrap', `
    white-space: nowrap;
  `)}
`

FormattedScript.propTypes = {
  speaker: PropTypes.string,
  speech:  PropTypes.string
}
function FormattedScript({speaker, speech}){
  return (
    <div className='d-flex my-1'>
      {speaker && <Small nowrap>{speaker}</Small>}
      {speech && <Small className='ml-2'>{speech}</Small>}
    </div>
  )
}

export default FormattedScript
