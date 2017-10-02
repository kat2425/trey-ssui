import React          from 'react'
import PropTypes      from 'prop-types'
import styled         from 'styled-components'
import {ifProp, prop} from 'styled-tools'
import uuid           from 'uuid'
import _              from 'lodash'

Transcript.propTypes = {
  call: PropTypes.shape({
    transcript: PropTypes.arrayOf(
      PropTypes.shape({
        speaker: PropTypes.string,
        speech:  PropTypes.string
      })
    )
  }).isRequired
}
export default function Transcript({call}) {
  const {transcript = []} = call
  const empty = <Small>No transcript available</Small> 

  return (
    <Wrapper>
      <p className='mb-1 font-weight-bold'>Transcript: </p>
      <Pre>
        { _.isEmpty(transcript) ? empty : renderTranscript(transcript)}
      </Pre>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({className: 'mb-2'})`
  display: block;
  overflow: auto;
  max-height: 300px;
`

const Pre = styled.pre.attrs({className: 'p-2'})`
  background-color: #f3f3f3;
`
const Small = styled.small`
  display: block;
  white-space: normal;

  ${ifProp('nowrap', `
    white-space: nowrap;
  `)}
`

const renderTranscript = (transcript) => 
  transcript.map(t => (
    <FormattedScript 
      key={uuid()} 
      speaker={t.speaker} 
      speech={t.speech}
    />
  ))

const FormattedScript = ({speaker, speech}) => 
  <div className='d-flex my-1'>
    <Small nowrap>{speaker}</Small>
    <Small className='ml-2'>{speech}</Small>
  </div>
  

