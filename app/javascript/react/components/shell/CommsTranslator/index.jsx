import React               from 'react'
import { observer }        from 'mobx-react'

import TranslatedTextPanel from 'ui/shell/TranslatedTextPanel'
import renderIf            from 'ui/hoc/renderIf'

import Wrapper             from './Wrapper'
import Spinner             from './Spinner'
import Label               from './Label'

const ETranslatedTextPanel = renderIf(TranslatedTextPanel)
const ESpinner             = renderIf(Spinner)
const ELabel               = renderIf(Label)

function CommsTranslator({store, style, className, color}){
  return (
    <Wrapper 
      style     = {style}
      className = {className}
    >
      <ELabel 
        onClick      = {store.toggleTranslator}
        languageName = {store.languageName}
        renderIf     = {store.showTranslator}
      />
      <ESpinner renderIf={store.isTranslating} />
      <ETranslatedTextPanel 
        color          = {color}
        translatedText = {store.translatedText}
        languageName   = {store.targetLanguageName}
        onGoBack       = {store.toggleTranslator}
        renderIf       = {store.showTranslatedText}
      />
    </Wrapper>
  )
}

export default observer(CommsTranslator)
