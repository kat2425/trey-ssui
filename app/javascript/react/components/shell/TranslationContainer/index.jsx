import React, { Component }    from 'react'
import { observer, inject }    from 'mobx-react'
import PropTypes               from 'prop-types'

import LanguageSelectWithLabel from 'ui/shell/LanguageSelectWithLabel'
import TranslatedTextPanel     from 'ui/shell/TranslatedTextPanel'
import renderIf                from 'ui/hoc/renderIf'

import Translator, { STATE }   from 'stores/models/Translator'

import Wrapper                 from './Wrapper'
import Spinner                 from './Spinner'

const ELanguageSelectWithLabel = renderIf(LanguageSelectWithLabel)
const ETranslatedTextPanel     = renderIf(TranslatedTextPanel)
const ESpinner                 = renderIf(Spinner)

@inject('translationStore')
@observer
export default class TranslationContainer extends Component {
  static propTypes = {
    color:           PropTypes.string,
    disabled:        PropTypes.bool,
    className:       PropTypes.string,
    style:           PropTypes.object,
    textToTranslate: PropTypes.string,
    onTranslate:     PropTypes.func,
    onTranslating:   PropTypes.func,
    renderLabel:     PropTypes.func,
    state:           PropTypes.oneOf(Object.values(STATE))
  }

  static defaultProps = {
    state: STATE.AUTO
  }

  store = null

  constructor(props){
    super(props)
    const { state, translationStore, textToTranslate } = this.props

    this.store = new Translator(translationStore, textToTranslate)
    this.store.setState(state)
  }

  componentWillReceiveProps(nextProps){
    this.store.setTextToTranslate(nextProps.textToTranslate)
    this.store.setState(nextProps.state)
  }

  componentWillUnmount(){
    this.store.dispose()
    this.store = null
  }

  handleOnClick = e => {
    e.preventDefault()
    this.store.handleLanguageChange({
      callback:         this.props.onTranslate,
      progressCallback: this.props.onTranslating
    })(this.store.language)
  }

  render(){
    return (
      <Wrapper 
        style     = {this.props.style}
        className = {this.props.className}
      >
        <ELanguageSelectWithLabel 
          color            = {this.props.color}
          renderLabel      = {this.props.renderLabel}
          defaultLanguage  = 'en'
          disabled         = {this.props.disabled}
          language         = {this.store.language}
          onLanguageChange = {this.store.handleLanguageChange({
            callback:         this.props.onTranslate,
            progressCallback: this.props.onTranslating
          })}
          showSpinner      = {this.store.showSelectSpinner}
          onClick          = {this.handleOnClick}
          renderIf         = {this.store.showSelect}
        />
        <ESpinner renderIf={this.store.showLoading} />
        <ETranslatedTextPanel 
          color          = {this.props.color}
          translatedText = {this.store.translatedText}
          languageName   = {this.store.languageName}
          onGoBack       = {this.store.clear}
          renderIf       = {this.store.showTranslatedText}
        />
      </Wrapper>
    )
  }
} 
