import {
  observable,
  action,
  autorun,
  runInAction
} from 'mobx'

import { setter }        from 'mobx-decorators'
import xhr               from 'helpers/XHR'
import moment            from 'moment'
import { padCharsStart } from 'lodash/fp'
import uiStore           from 'stores/UiStore'
import getError          from 'helpers/ErrorParser'
import _isEmpty          from 'lodash/isEmpty'
import intercomEvent     from 'helpers/Intercom'

export class CallingStore {
  @setter @observable callBarVisible       = false
  @setter @observable callTime             = null
  @setter @observable isCalling            = false
  @setter @observable isCellCalling        = false
  @setter @observable isCellSelected       = false
  @setter @observable showCallDialog       = false
  @setter @observable isCallNotesSelected  = false
  @setter @observable isDialPadSelected    = false
  @setter @observable isMuteSelected       = false
  @setter @observable isError              = null
  @setter @observable isSaved              = null
  @setter @observable isDisabled           = false

  @observable connection                   = null
  @observable contact                      = null
  @observable contactName                  = null
  @observable currentOutputDevice          = null
  @observable isConnected                  = false
  @observable outputDevices                = []
  @observable phoneNumber                  = null
  @observable studentID                    = null
  @observable callSID                      = null
  @observable callNoteText                 = ''

  callStartTime   = null
  device          = null
  intervalHandler = null

  constructor() {
    this.initAutoruns()
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        uiStore.addNotification({
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  generateToken = async() => {
    try {
      return await xhr.get('/commo/capability_token')
    } catch(e){
      this.setError(getError(e))
    }
  }

  // Browser calling
  @action
  initiateCall = async(studentId) => {
    try {
      this.callStartTime = null
      this.setCallBarVisible(true)
      this.setCallTime(null)
      this.setIsCalling(true)
      this.setIsCellSelected(false)
      this.setShowCallDialog(false)

      const { data } = await this.generateToken()

      this.initialCallOK(studentId, data)
    } catch(e){
      this.setIsError(getError(e))
    }
  }

  @action
  initialCallOK = (studentId, data) => {    
    this.contactName = this.contact.name
    this.studentID   = studentId
    this.phoneNumber = this.contact.phone
    this.userId      = data.user

    this.setupDevice(data.token)

    setTimeout(() => this.connect(this.phoneNumber), 2000)
  }

  @action
  connect = () => {
    const params = {
      contact_id: this.contact.id,
      student_id: this.studentID,
      tocall:     this.phoneNumber,
      user_id:    this.userId
    }

    intercomEvent('web:calling:web', params)

    this.connection = Twilio.Device.connect(params)

    this.connection.accept(this.connectionAccept)

    this.connection.disconnect(this.connectionDisconnect)

    this.connection.reject(this.connectionReject)
  }

  @action
  connectionAccept = (conn) => {
    this.callSID = conn.parameters.CallSid
    this.getOutputDevices()
    this.isConnected = true
    this.callStartTime = Date.now()

    this.intervalHandler = setInterval(action('SETTING CALL TIME', () => {
      this.setCallTime(getTime(this.callStartTime, Date.now()))
    }), 1000)
  }

  @action
  connectionDisconnect = () => {
    this.isConnected = false
    this.setIsCalling(false)
    clearInterval(this.intervalHandler)
    setTimeout(action(() =>
      !this.isCalling && this.setCallBarVisible(false)), 5000)
  }

  @action
  connectionReject = () => {
    this.isConnected = false
    this.setIsCalling(false)
    setTimeout(action(() =>
      !this.isCalling && this.setCallBarVisible(false)), 5000)
  }


  // Dialpad
  @action
  sendDigit = (digit) => {
    this.connection.sendDigits(digit)
  }

  // Cell-to-Cell Calling
  @action
  initiateCellCall = async(contact, student_id) => {
    try {
      this.setIsDisabled(true)
      const response = await this.generateToken()

      this.initiateCellCallOK(contact, student_id, response)
    } catch(e) {
      runInAction(() => {
        this.setIsError(getError(e))
        this.setIsDisabled(false)
      })
    }
  }

  @action
  initiateCellCallOK = (contact, student_id, response) => {
    this.contactID   = contact.id
    this.contactName = contact.name
    this.phoneNumber = contact.phone
    this.studentID   = student_id
    this.userId      = response.data.user

    this.completeCellCall()
  }

  @action
  completeCellCall = async() => {
    intercomEvent('web:calling:cell', {contact: this.contactID})
    try {
      await xhr.post('/commo/voice/mobile_call', { contact_id: this.contactID })

      this.completeCellCallOK()
    } catch(e){
      intercomEvent('web:calling:cell_call_error', {message: getError(e).message})
      runInAction(() => {
        this.setIsError(getError(e))
        this.setIsDisabled(false)
      })
    }
  }

  @action
  completeCellCallOK = () => {
    this.setIsCellCalling(true)
    this.setCallBarVisible(true)

    setTimeout(action(() => {
      this.setIsDisabled(false)
      this.setIsCellCalling(false)
      !this.isCalling && this.setCallBarVisible(false)
    }), 6000)
  }

  @action
  getOutputDevices = () => {
    Twilio.Device.audio.availableOutputDevices.forEach((device, id) => {
      this.outputDevices.push({ label: device.label, id })
    })
  }

  @action
  changeOutput = (device, label) => {
    Twilio.Device.audio.speakerDevices.set(device)
    this.currentOutputDevice = label
  }

  @action
  hangUp = () => {
    this.isConnected = false
    this.connection.disconnect()
    this.setIsCalling(false)
    this.setIsCellCalling(false)
    this.setIsDialPadSelected(false)
    this.outputDevices = []

    setTimeout(action(() => {
      !this.isCalling && this.setCallBarVisible(false)
    }), 5000)
  }

  @action
  setupDevice(token) {
    try {
      this.device = Twilio.Device.setup(token, { region: 'us1', debug: true })
    }
    catch (e) {
      this.setError(getError(e))
    }

    this.device.error((error) => {
      const message = returnError(error.code)

      intercomEvent('web:calling:web_call_error', {message: message, code: error.code})

      this.setIsError({
        message,
        title: 'Error'
      })
    })
  }

  @action
  toggleMute = () => {
    this.setIsMuteSelected(!this.isMuteSelected)
    this.connection.mute(this.isMuteSelected)
  }

  /* Call Notes */
  @action
  setCallNoteText = (text) => {
    this.callNoteText = text
  }

  @action
  addCallNote = async() => {
    try {
      this.setIsError(false)

      if(_isEmpty(this.callNoteText.trim())) {
        this.setIsError({
          title:   'Note',
          message: 'Your note cannot be empty!',
          type:    'error'
        })
        return
      }

      await xhr.post('/commo/call_log/deferred_note', {
        call_log_sid: this.callSID,
        body:         this.callNoteText
      })

      this.addCallNoteOK()
    } catch(e){
      this.setIsError(getError(e))
    }
  }

  @action
  addCallNoteOK = () => {
    this.setCallNoteText('')

    uiStore.addNotification({
      title:   'Note',
      message: 'Note successfully added!',
      type:    'success'
    })
  }

  @action
  cancelCallSelection = () => {
    this.setShowCallDialog(false)
  }
}

function getTime(start, end) {
  const startTime = moment(start)
  const endTime   = moment(end)
  const duration  = moment.duration(endTime.diff(startTime))
  const padTime   = padCharsStart('0')(2)

  const hours     = parseInt(duration.asHours()).toString()
  const minutes   = (parseInt(duration.asMinutes()) - hours * 60).toString()
  const secs      = (parseInt(duration.asSeconds()) - minutes * 60).toString()

  return `${padTime(minutes)}:${padTime(secs)}`
}

function returnError(errorCode) {
  switch (errorCode) {
  case 31000:
    return `We can't complete this call because it is either
            blocked by a firewall or you have lost connection to the Internet.`
  case 31002:
    return `This contact's number does not allow communication from SchoolStatus.`
  case 31003:
    return `We can't complete this call because it is either
            blocked by a firewall or you have lost connection to the Internet.`
  case 31205:
    return 'There was an error attempting to place the call. Please refresh the page and try again.'
  case 31208:
    return 'We require access to your microphone.'
  case 31201:
    return `We can't access your microphone. Please check your permissions.`
  default:
    return 'We experienced an unknown error.'
  }
}

export default new CallingStore()
