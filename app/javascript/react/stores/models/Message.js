import { 
  observable, 
  action, 
  computed,
  autorun
} from 'mobx'
import { setter }       from 'mobx-decorators'
import DateFormat       from 'helpers/DateFormat'
import uiStore          from 'stores/UiStore'

import xhr              from 'helpers/XHR'
import getError         from 'helpers/ErrorParser'
import translationStore from 'stores/TranslationStore'
import { getOr }        from 'lodash/fp'

const LANGUAGE = {
  EN:           'en',
  UNDETERMINED: 'und'
}

export default class Message {
  store          = null

  id             = null
  mediaUrl       = null
  createdAt      = null
  contact        = null
  user           = null
  direction      = null
  body           = null
  readStatus     = null
  conversationId = null

  @observable expandedTranslator    = false
  @observable language              = null
  @observable targetLanguage        = LANGUAGE.EN

  @setter @observable meta          = null
  @setter @observable isTranslating = false
  @setter @observable isError       = false

  constructor(store, json){
    this.store = store
    this.update(json)

    this.initAutoruns()
  }

  // Autoruns
  initAutoruns = () => {
    this.autoTranslate()
    this.autoErrorNotifier()
  }

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

  autoTranslate = () => {
    this.autoTranslateDisposer = autorun('Auto Translate', () => {
      if(!this.hasTranslation){
        this.translate(this.targetLanguage)
      }
    })
  }

  // Computed
  @computed get languageName(){
    return translationStore.languages.get(this.language).name
  }

  @computed get targetLanguageName(){
    return translationStore.languages.get(this.targetLanguage).name
  }

  @computed get showTranslator(){
    return this.hasTranslation && !this.expandedTranslator
  }

  @computed get showTranslatedText(){
    return this.hasTranslation && this.expandedTranslator
  }

  @computed get hasTranslation(){
    return !!this.translatedText
  }

  @computed get translatedText(){
    return getOr(null, ['translations', this.targetLanguage], this.meta)
  }

  @computed get isOutbound(){
    return this.direction === 'outbound'
  }

  @computed get isInbound(){
    return this.direction === 'inbound'
  }

  @computed get bubbleDirection(){
    return this.isOutbound ? 'media-current-user ml-5' : 'mr-5'
  }

  @computed get footerDirection(){
    return this.isOutbound ? 'float-right mr-3' : 'ml-3'
  }

  @computed get timeFromNow(){
    return DateFormat.timeAgo(this.createdAt)
  }

  @computed get fullDateWithTime(){
    return DateFormat.fullDateWithTime(this.createdAt)
  }


  @computed get shouldSetRead(){
    return !this.isRead && this.isInbound
  }

  @computed get isRead(){
    return this.readStatus
  }

  // Autoruns
  initAutoruns = () => {
    this.autoErrorNotifier()
  }

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
  @action translate = async(language) => {
    if(!language) return

    try {
      this.setIsTranslating(true)
      this.setIsError(false)

      const {data} =  await xhr.get(`/commo/sms_log/${this.id}/${language}`)

      uiStore.addMessage('Translation successful')
      this.update(data)
    } catch(e){
      this.setIsError(getError(e))
      console.error(e)
    } finally {
      this.setIsTranslating(false)
    }
  }

  @action update = ({
    id,
    contact,
    user,
    direction,
    meta,
    language,
    body,
    read_status:     readStatus,
    media_url:       mediaUrl,
    created_at:      createdAt,
    conversation_id: conversationId
  }) => {
    this.id             = id
    this.mediaUrl       = mediaUrl
    this.createdAt      = createdAt
    this.contact        = contact
    this.user           = user
    this.direction      = direction
    this.body           = body
    this.readStatus     = readStatus
    this.meta           = meta
    this.language       = language === LANGUAGE.UNDETERMINED ? LANGUAGE.EN : language
    this.conversationId = conversationId
  }

  @action clear = () => {
    this.toggleTranslator()
  }

  @action toggleTranslator = () => {
    this.expandedTranslator = !this.expandedTranslator
  }

  @action dispose = () => {
    this.autoErrorDisposer && this.autoErrorDisposer()
    this.autoTranslateDisposer && this.autoTranslateDisposer()
  }
}
