import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx'

import xhr                    from 'helpers/XHR'
import { setter }             from 'mobx-decorators'
import { isEmpty, getOr }     from 'lodash/fp'
import uiStore                from 'stores/UiStore'
import getFormattedTranscript from 'helpers/TranscriptParser'
import getError               from 'helpers/ErrorParser'

export default class Transcript {
  @setter @observable originalTranscript   = null

  @setter @observable isError              = false
  @setter @observable isVoicemail          = false
  @setter @observable isFetchingTranscript = false

  @setter @observable voiceTranscript      = false
  @setter @observable callTranscript       = null
  @setter @observable transcriptSeparator  = 'Speaker'

  @computed get transcript(){
    if(this.isVoicemail) return this.voiceTranscript

    if(isEmpty(this.callTranscript)) return []

    return getFormattedTranscript(this.callTranscript, this.transcriptSeparator)
  }

  constructor(){
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
  @action translateTranscript = (translatedText) => {
    const matches    = translatedText.match(/(\w+\s)\d\s*:/) || []
    const isNotEmpty = !isEmpty(matches) && !isEmpty(matches.slice(1))
    const separator  = isNotEmpty ? matches.slice(1).find(Boolean) : null

    this.setTranscriptSeparator(separator)
    this.setCallTranscript(translatedText)
  }

  @action fetchCallTranscript = async(id) => {
    try {
      this.setIsFetchingTranscript(true)
      this.setIsError(false)

      const params = { 
        show_transcript: true,
        only:            ['call_transcripts.call_transcript'].join(',')
      } 
      const { data } = await xhr.get(`/commo/call_log/${id}`, {params})

      this.updateFromJSON(data)
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      this.setIsFetchingTranscript(false)
    }
  }

  @action updateFromJSON = ({call_transcripts}) => {
    const ct = getOr('', ['0', 'call_transcript'], call_transcripts)

    this.setCallTranscript(ct)
    this.setOriginalTranscript(ct)
  }

  @action dispose = () => {
    this.autoErrorDisposer && this.autoErrorDisposer()
  }
}
