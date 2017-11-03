import React                from 'react'
import {observer}           from 'mobx-react'
import PropTypes            from 'prop-types'
import uuid                 from 'uuid'
import _                    from 'lodash'

import FormattedScript      from 'ui/shell/FormattedScript/'
import Wrapper              from './Wrapper'
import ScriptWrapper        from './ScriptWrapper'
import Header               from './Header'
import Small                from './Small'
import { STATE }            from 'stores/models/Translator'
import userStore            from 'stores/UserStore'

import TranslationContainer from 'ui/shell/TranslationContainer'

Transcript.propTypes = {
  isLoading:          PropTypes.bool,
  title:              PropTypes.string,
  originalTranscript: PropTypes.string,
  onTranslate:        PropTypes.func.isRequired,
  onTranslating:      PropTypes.func.isRequired,
  transcript:         PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        speaker: PropTypes.string,
        speech:  PropTypes.string
      })
    )
  ])
}

function Transcript({
  isLoading,
  transcript,
  title = 'Transcript:',
  onTranslate,
  onTranslating,
  originalTranscript
}) {
  const script = _.isArray(transcript) 
    ? renderTranscript(transcript) 
    : <FormattedScript speech={transcript} />

  const empty         = <Small>Transcript not available</Small>
  const hasTranscript = !_.isEmpty(transcript)

  return (
    <Wrapper>
      <Header>
        <p className='mb-1 font-weight-bold'>{title}</p>
        {userStore.user.hasChannel && (
          <TranslationContainer
            className       = 'mx-2'
            textToTranslate = {originalTranscript}
            style           = {{marginTop: -17}}
            onTranslate     = {onTranslate}
            onTranslating   = {onTranslating}
            disabled        = {!hasTranscript || isLoading}
            state           = {STATE.SELECT_ONLY}
          />
        )}
      </Header>
      <ScriptWrapper> {(() => {
        if(isLoading) return <Small>Loading ...</Small>
        return hasTranscript ? script :  empty
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
