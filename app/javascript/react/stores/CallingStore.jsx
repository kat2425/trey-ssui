import { observable, action }  from 'mobx'
import { setter }              from 'mobx-decorators'
import xhr                     from 'helpers/XHR'
import moment                  from 'moment'
import { padCharsStart }       from 'lodash/fp'

class CallingStore {
  // Observables
  @setter @observable callBarVisible       = false
  @setter @observable callTime             = null
  @setter @observable isCalling            = false
  @setter @observable isConferenceCalling  = false
  @setter @observable selectCall           = false
  @setter @observable selectConferenceCall = false
  @setter @observable selectDialPad        = false
  @setter @observable selectMute           = false

  @observable connection          = null
  @observable contact             = null
  @observable contactName         = null
  @observable isConnected         = false
  @observable phoneNumber         = null
  @observable studentID           = null
  @observable currentOutputDevice = null
  @observable outputDevices       = []

  device          = null
  intervalHandler = null
  callStartTime   = null

  generateToken = () => {
    return xhr.get('/commo/capability_token')
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error)
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

    this.contactName = this.contact.refs[0].name
    this.studentID   = studentId
    this.phoneNumber = this.contact.refs[0].phone
    this.userId      = data.data.user

    const token      = data.data.token

    this.setupDevice(token)

    setTimeout(() => this.connect(this.phoneNumber), 2000)
  }

  @action
  connect = (number) => {
    const params = {
      contact_id: this.contact.refs[0].id,
      student_id: this.studentID,
      tocall:     this.phoneNumber,
      user_id:    this.userId
    }

    this.connection = Twilio.Device.connect(params)

    this.connection.accept((conn) => {
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
    xhr.post('/commo/voice/mobile_call', {
      contact_id: this.contactID
    })
      .then(() => {
        this.setIsConferenceCalling(true)
        this.setCallBarVisible(true)

        setTimeout(() => {
          this.setIsConferenceCalling(false)
          this.setCallBarVisible(false)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  @action
  initiateConferenceCall = async(contact, student_id) => {
    const data  = await this.generateToken()

    this.contactID   = contact.refs[0].id
    this.contactName = contact.refs[0].name
    this.phoneNumber = contact.refs[0].phone
    this.studentID   = student_id
    this.userId      = data.data.user

    this.conferenceCall()
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
      Twilio.Device.setup(token, { region: 'us1', debug: true })
    }
    catch(e) {
      console.log(e)
    }
  }
}

function getTime(start, end) {
  var startTime = moment(start)
  var endTime   = moment(end)
  var duration  = moment.duration(endTime.diff(startTime))
  const padTime = padCharsStart('0')(2)

  var hours     = parseInt(duration.asHours()).toString()
  var minutes   = (parseInt(duration.asMinutes()) - hours * 60).toString()
  var secs      = (parseInt(duration.asSeconds()) - minutes * 60).toString()

  return `${padTime(minutes)}:${padTime(secs)}`
}

export default CallingStore = new CallingStore()
