import { observable, action, computed, runInAction, autorun, toJS } from 'mobx'
import { setter } from 'mobx-decorators'

import _ from 'lodash'
import xhr from 'helpers/XHR'
import axios from 'axios'
import moment from 'moment'
import { isEmpty, padCharsStart } from 'lodash/fp'
class CallingStore {
  
  @observable studentID = null
  @observable contact = null
  @observable contactName = null
  @observable phoneNumber = null
  @observable connection = null
  @observable isConnected = false
  @observable currentOutputDevice = null
  @observable outputDevices = []

  @setter @observable isCalling = false
  @setter @observable callBarVisible = false
  @setter @observable selectConferenceCall = false
  @setter @observable selectCall = false
  @setter @observable selectDialPad = false
  @setter @observable selectMute = false
  @setter @observable callTime = null

  intervalHandler = null
  disposerTmr = null
  callStartTime = null

  generateToken = () => {
    return xhr.get('/commo/capability_token')
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /* Calling from Browser */
  @action
  initiateCall = async (contact, studentId) => {
    this.callStartTime = null
    this.setCallTime(null)
    this.setSelectConferenceCall(false)
    const data = await this.generateToken()
    this.setIsCalling(true)
    this.setCallBarVisible(true)

    this.contactName = this.contact.refs[0].name
    this.studentID = studentId
    const phoneNumber = '6012128813'
    const token = data.data.token
    this.userId = data.data.user

    this.setupDevice(token)
    setTimeout(() =>
      this.connect(phoneNumber), 2000)
  }

  @action
  connect = (number) => {
    const params = {
      contact_id: this.contact.refs[0].id,
      student_id: this.studentID,
      tocall: '6012128183',
      user_id: this.userId
    }

    this.connection = Twilio.Device.connect(params)

    this.connection.accept((conn) => {
      this.getOutputDevices()
      this.isConnected = true
      console.log(Twilio.Device.audio.speakerDevices)
      if (this.isConnected) {
        this.callStartTime = Date.now()
        this.intervalHandler = setInterval(action('SETTING CALL TIME', () => {
          const t = getTime(this.callStartTime, Date.now())
          this.setCallTime(t)
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

  /* Open Dialpad */
  @action
  isDialPad = (bool) => {
    this.setSelectDialPad(bool)
  }

  @action
  sendDigit = (digit) => {
    this.connection.sendDigits(digit)
  }

  /* Conference Calling */
  @action
  conferenceCall = () => {
    const params = {
      contact_id: this.contactID
    }

    xhr.post('/commo/voice/mobile_call', {
      contact_id: this.contactID
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  @action
  initiateConferenceCall = async (contact, student_id) => {
    console.log(contact.refs[0].id)
    this.contactID = contact.refs[0].id
    this.contactName = contact.refs[0].name
    this.phoneNumber = contact.refs[0].phone
    this.studentID = student_id

    const data = await this.generateToken()
    const token = data.data.token
    this.userId = data.data.user

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

    setTimeout(() => {
      this.setCallBarVisible(false);
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
      const device = Twilio.Device.setup(token)
    }
    catch (e) {
      console.log(e)
    }
  }
}

function getTime(start, end) {
  var startTime = moment(start)
  var endTime = moment(end)
  var duration = moment.duration(endTime.diff(startTime))
  const padTime = padCharsStart('0')(2)

  var hours = parseInt(duration.asHours()).toString()
  var minutes = (parseInt(duration.asMinutes()) - hours * 60).toString()
  var secs = (parseInt(duration.asSeconds()) - minutes * 60).toString()

  return `${padTime(minutes)}:${padTime(secs)}`
}

export default CallingStore = new CallingStore()