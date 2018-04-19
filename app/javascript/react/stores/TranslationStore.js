import { observable, action, autorun } from 'mobx'

import { setter }                      from 'mobx-decorators'
import xhr                             from 'helpers/XHR'
import uiStore                         from 'stores/UiStore'
import getError                        from 'helpers/ErrorParser'
import cachedLanguages                 from 'helpers/languages'

const API = '/commo/translate'

export class TranslationStore {
  @setter 
  @observable isError = null

  @setter 
  @observable isLoading = false

  @setter 
  @observable isFetchingLanguages = false

  @observable languages = observable.map()

  constructor(){
    // sets default languages
    this.setLanguages(cachedLanguages)

    this.initAutoruns()
  }

  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  // Autoruns
  autoErrorNotifier = () => {
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

  // Actions
  @action identifyLanguage = async(text) => {
    const {data} =  await xhr.post(`${API}/identify`, {text})

    return data.language
  }

  @action translate = async(text, target = 'en', source = 'en', engine = 'google') => {
    const {data} =  await xhr.post(`${API}`, {text, target, source, engine})

    return data.translation
  }

  @action fetchLanguages = async(engine = 'google') => {
    try {
      this.setIsFetchingLanguages(true)
      this.setIsError(false)
      const {data} =  await xhr.get(`${API}/languages`, {engine})

      this.setLanguages(data)
      return data
    } catch(e){
      this.setIsError(getError(e))
      console.error(e)
    } finally {
      this.setIsFetchingLanguages(false)
    }
  }

  @action updateLanguage = (lang) => {
    if(this.languages.has(lang.language)) return
    this.languages.set(lang.language, lang)
  }

  @action setLanguages = (langs = []) => {
    langs.forEach(this.updateLanguage)
  }

  @action setLoadingState =  () => {
    this.setIsLoading(true)
    this.setIsError(false)
  }
}

export default new TranslationStore()
