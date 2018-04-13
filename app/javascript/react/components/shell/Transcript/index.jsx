import React                from 'react'
import {observer}           from 'mobx-react'
import { Alert }            from 'reactstrap'
import PropTypes            from 'prop-types'
import uuid                 from 'uuid'
import _                    from 'lodash'

import FormattedScript      from 'ui/shell/FormattedScript/'
import Wrapper              from './Wrapper'
import ScriptWrapper        from './ScriptWrapper'
import Obfuscated           from './Obfuscated'
import Header               from './Header'
import Small                from './Small'
import { STATE }            from 'stores/models/Translator'
import userStore            from 'stores/UserStore'

import TranslationContainer from 'ui/shell/TranslationContainer'
import LoadingSpinner       from 'ui/shell/LoadingSpinner'

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
      <ScriptWrapper>
        {userStore.user.hasChannel && getTranscriptOrFallback(isLoading, hasTranscript, script)}
        {!userStore.user.hasChannel && getUpgrade()}
        {!userStore.user.hasChannel &&
        <Obfuscated>{getTranscriptOrFallback(isLoading, hasTranscript, script)}</Obfuscated>}
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

const getUpgrade = () => <Alert color="info" className="text-center h6">
  {
    'Call transcription available with our upgraded communications package.\
    Talk to your district staff about upgrading your subscription today!'
  }
</Alert>

const getTranscriptOrFallback = (isLoading, hasTranscript, script) => {
  if(!isLoading && hasTranscript) {
    return script
  } else if(!isLoading && !hasTranscript) {
    return <Small>Transcript not available</Small>
  } else {
    return <LoadingSpinner center />
  }
}

export default observer(Transcript)
