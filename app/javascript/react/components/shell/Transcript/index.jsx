import React           from 'react'
import {observer}      from 'mobx-react'
import PropTypes       from 'prop-types'
import uuid            from 'uuid'
import _               from 'lodash'

import FormattedScript from 'ui/shell/FormattedScript/'
import Wrapper         from './Wrapper'
import ScriptWrapper   from './ScriptWrapper'
import Small           from './Small'

Transcript.propTypes = {
  isLoading:  PropTypes.bool,
  title:      PropTypes.string,
  transcript: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        speaker: PropTypes.string,
        speech:  PropTypes.string
      })
    )
  ])
}

function Transcript({isLoading, transcript, title = 'Transcript:'}) {
  const script = _.isArray(transcript) 
    ? renderTranscript(transcript) 
    : <FormattedScript speaker='Speaker:' speech={transcript} />
  const empty = <Small>Transcript not available</Small> 

  return (
    <Wrapper>
      <p className='mb-1 font-weight-bold'>{title}</p>
      <ScriptWrapper> {(() => {
        if(isLoading) return <Small>Loading ...</Small>
        return _.isEmpty(transcript) ?  empty : script 
      })()} 
      </ScriptWrapper> 
    </Wrapper>
  )
}

const renderTranscript = (transcript) => 
  transcript.map(t => (
    <FormattedScript 
      key={uuid()} 
      speaker={t.speaker} 
      speech={t.speech}
    />
  ))

export default observer(Transcript)
