import { observable, action, autorun } from 'mobx'
import { setter }                      from 'mobx-decorators'
import xhr                             from 'helpers/XHR'
import moment                          from 'moment'
import { padCharsStart }               from 'lodash/fp'
import uiStore                         from 'stores/UiStore'
import intercomEvent                   from 'helpers/Intercom'

class CallingStore {
  // Observables
  @setter @observable callBarVisible       = false
  @setter @observable callTime             = null
  @setter @observable isCalling            = false
  @setter @observable isConferenceCalling  = false
  @setter @observable selectCallNotes      = false
  @setter @observable selectCall           = false
  @setter @observable selectConferenceCall = false
  @setter @observable selectDialPad        = false
  @setter @observable selectMute           = false
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

  generateToken = () => {
    return xhr.get('/commo/capability_token')
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log('generate token error:', error)
      })
  }

  // Browser calling
  @action
  initiateCall = async(contact, studentId) => {
    this.callStartTime = null

    this.setCallTime(null)
    this.setSelectConferenceCall(false)

    const data = await this.generateToken()

    this.setIsCalling(true)
    this.setCallBarVisible(true)

    this.contactName = this.contact.name
    this.studentID   = studentId
    this.phoneNumber = this.contact.phone
    this.userId      = data.data.user

    const token = data.data.token

    this.setupDevice(token)

    setTimeout(() => this.connect(this.phoneNumber), 2000)
  }

  @action
  connect = (number) => {
    const params = {
      contact_id: this.contact.id,
      student_id: this.studentID,
      tocall:     this.phoneNumber,
      user_id:    this.userId
    }

    intercomEvent('web:calling:web', params)

    this.connection = Twilio.Device.connect(params)

    this.connection.accept((conn) => {
      this.callSID = conn.parameters.CallSid
      this.getOutputDevices()
      this.isConnected = true

      if (this.isConnected) {
        this.callStartTime = Date.now()

        this.intervalHandler = setInterval(action('SETTING CALL TIME', () => {
          this.setCallTime(getTime(this.callStartTime, Date.now()))
        }), 1000)
      }
    })

    this.connection.disconnect((conn) => {
      this.setIsCalling(false)
      clearInterval(this.intervalHandler)
      setTimeout(() =>
        !this.isCalling && this.setCallBarVisible(false), 5000)
    })

    this.connection.reject((conn) => {
      this.setIsCalling(false)
      setTimeout(() =>
        this.setCallBarVisible(false), 5000)
    })
  }

  // Dialpad
  @action
  isDialPad = (bool) => {
    this.setSelectDialPad(bool)
  }

  @action
  sendDigit = (digit) => {
    this.connection.sendDigits(digit)
  }

  // Cell-to-Cell Calling
  @action
  conferenceCall = () => {
    intercomEvent('web:calling:cell', {contact: this.contactID})

    xhr.post('/commo/voice/mobile_call', {
      contact_id: this.contactID
    })
      .then(() => {
        this.setIsConferenceCalling(true)
        this.setCallBarVisible(true)

        setTimeout(() => {
          this.setIsDisabled(false)
          this.setIsConferenceCalling(false)
          this.setCallBarVisible(false)
        }, 6000)
      })
      .catch((error) => {
        this.setIsDisabled(false)
        let errorMessage = 'We experienced an unknown error.'  // default error message

        if (error.response.data && error.response.data.message) { // specific errors
          // TODO: if this is a problem of the user not verifying their mobile number,
          // it'd be nice to give them the option to verify here.
          errorMessage = error.response.data.message
        }

        uiStore.addNotification({
          title:   'Error',
          message: errorMessage,
          type:    'error'
        })

        intercomEvent('web:call:cell_call_error', {message: errorMessage})
        console.error('Calling Error:', error)
      })
  }

  @action
  initiateConferenceCall = async(contact, student_id) => {
    try {
      this.setIsDisabled(true)
      const data = await this.generateToken()

      this.contactID   = contact.id
      this.contactName = contact.name
      this.phoneNumber = contact.phone
      this.studentID   = student_id
      this.userId      = data.data.user

      this.conferenceCall()
    } finally {
      this.setIsDisabled(false)
    }
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
    this.setIsConferenceCalling(false)

    setTimeout(() => {
      !this.isCalling && this.setCallBarVisible(false)
    }, 5000)

    this.isDialPad(false)
    this.outputDevices = []
  }

  @action.bound
  isCall(bool) {
    this.setSelectCall(bool)
  }

  @action.bound
  isConferenceCall(bool) {
    this.setSelectConferenceCall(bool)
  }

  @action
  isMute = (bool) => {
    this.setSelectMute(bool)
    this.connection.mute(bool)
  }

  @action
  setupDevice(token) {
    try {
      this.device = Twilio.Device.setup(token, { region: 'us1', debug: true })
    }
    catch (e) {
      console.log(e)
    }

    this.device.error((error) => {
      const message = returnError(error.code)

      intercomEvent('web:call:web_call_error', {message: message, code: error.code})
      console.error('Calling Error:', error)

      this.setIsError({
        message,
        title: 'Error'
      })
    })
  }

/* Call Notes */
@action
isCallNotes = (bool) => {
  this.selectCallNotes = bool
}

@action
setCallNoteText = (text) => {
  this.callNoteText = text
}

@action
addCallNote = () => {
  this.setIsError(false)
  if(this.callNoteText.trim() != '') {
    xhr.post('/commo/call_log/deferred_note', {
      call_log_sid: this.callSID,
      body:         this.callNoteText
    })
      .then(action(() => {
        this.setCallNoteText('')
        
        uiStore.addNotification({
          title:   'Note',
          message: 'Note successfully added!',
          type:    'success'
        })
      }))
      .catch((error) => {
        this.setIsError({
          message: 'Something went wrong! We were unable to save the note',
          title:   'Error'
        })
      })
  } else {
    uiStore.addNotification({
      title:   'Note',
      message: 'Your note cannot be empty!',
      type:    'error'
    })
  }
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
    return `We can't complete this call because it is either blocked by a firewall or you have lost connection to the Internet.`
    break
  case 31002:
    return `This contact's number does not allow communication from SchoolStatus.`
    break
  case 31003:
    return `We can't complete this call because it is either blocked by a firewall or you have lost connection to the Internet.`
    break
  case 31205:
    return `There was an error attempting to place the call. Please refresh the page and try again.`
    break
  case 31208:
    return `We require access to your microphone.`
    break
  default:
    return `We experienced an unknown error.`
  }

  return errorMessage
}

export default CallingStore = new CallingStore()
