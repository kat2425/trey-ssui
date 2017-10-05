import React      from 'react'
import {observer} from 'mobx-react'
import PropTypes  from 'prop-types'
import styled     from 'styled-components'
import {ifProp}   from 'styled-tools'
import uuid       from 'uuid'
import _          from 'lodash'

Transcript.propTypes = {
  comm: PropTypes.shape({
    transcript: PropTypes.arrayOf(
      PropTypes.shape({
        speaker: PropTypes.string,
        speech:  PropTypes.string
      })
    )
  }).isRequired
}
function Transcript({comm}) {
  const {transcript = [], isLoading} = comm

  if(isLoading) return (<Container><Small>Loading ...</Small></Container>)
  
  return (
    <Container>
      { _.isEmpty(transcript) 
        ? <Small>No transcript available</Small>
        : renderTranscript(transcript)
      }
    </Container>
  )
}

const Container = ({children}) => (
  <Wrapper>
    <p className='mb-1 font-weight-bold'>Transcript: </p>
    <Pre>{children}</Pre>
  </Wrapper>
)

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
  
export default observer(Transcript)
