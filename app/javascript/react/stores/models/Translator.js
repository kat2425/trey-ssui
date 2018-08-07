import { 
  observable,
  action,
  autorun,
  computed
} from 'mobx'

import { setter } from 'mobx-decorators'
import uiStore    from 'stores/UiStore'
import getError   from 'helpers/ErrorParser'
import { noop }   from 'lodash/fp'

const DEFAULT_LANGUAGE = {language: 'en', name: 'English'}

export const STATE = {
  AUTO:        'AUTO',
  SELECT_ONLY: 'SELECT_ONLY'
}

export default class Translator {
  store = null

  @setter @observable state            = STATE.AUTO
  @setter @observable textToTranslate  = null
  @setter @observable translatedText   = null

  @setter @observable isError          = null
  @setter @observable isLoading        = false

  @setter @observable selectedLanguage = DEFAULT_LANGUAGE

  constructor(store, textToTranslate){
    this.store           = store
    this.textToTranslate = textToTranslate

    this.autoErrorNotifier()
  }

  // Computed
  @computed get languageName(){
    return this.selectedLanguage.name
  }

  @computed get language(){
    return this.selectedLanguage.language
  }

  @computed get showLoading(){
    switch(this.state){
    case STATE.SELECT_ONLY:
      return false
    default:
      return this.isLoading
    }
  }

  @computed get showSelect(){
    const show = !this.isLoading && !this.translatedText

    switch(this.state){
    case STATE.AUTO:
      return show
    case STATE.SELECT_ONLY:
      return true
    default:
      return show
    }
  }

  @computed get showSelectSpinner(){
    switch(this.state){
    case STATE.SELECT_ONLY:
      return this.isLoading
    default:
      return false
    }
  }

  @computed get showTranslatedText(){
    const show = !!this.translatedText

    switch(this.state){
    case STATE.AUTO:
      return show
    case STATE.SELECT_ONLY:
      return false
    default:
      return show
    }
  }

  // Actions
  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if(this.isError && !this.isError.hideNotification){
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    'error'
        })
      }
    })
  }

  @action translate = async(language = 'en', callback, progressCallback) => {
    if(!this.textToTranslate) return

    this.setIsLoading(true)
    this.setIsError(false)
    progressCallback(true)

    try {
      const translatedText = await this.store.translate(
        this.textToTranslate,
        language
      )

      uiStore.addMessage('Translation successful')
      this.setTranslatedText(translatedText)
      callback(null, translatedText)
    } catch (e) {
      this.setIsError(getError(e))
      callback(true)
    } finally {
      this.setIsLoading(false)
      progressCallback(false)
    }
  }

  @action handleLanguageChange = ({callback = noop, progressCallback = noop} = {}) => (language = 'en') => {
    this.setSelectedLanguage(this.store.languages.get(language))
    this.translate(language, callback, progressCallback)
  }

  @action dispose = () => {
    this.autoErrorDisposer && this.autoErrorDisposer()
  }

  @action clear = () => {
    this.setTranslatedText(null)
  }
}
