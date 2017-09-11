import { observable, action, computed, runInAction, autorun, toJS } from 'mobx'
import {setter} from 'mobx-decorators'

import _   from 'lodash'
import xhr from 'helpers/XHR'
import axios from 'axios'
import moment from 'moment'
class CallingStore {
  @setter @observable isCalling = false
  @setter @observable callBarVisible   = false
  @observable studentID         = null
  @observable contact           = null
  @observable contactName       = null
  @observable phoneNumber       = null
  @observable connection        = null

  @setter @observable selectConferenceCall = false
  @setter @observable selectCall = false
  @setter @observable selectDialPad = false
  @setter @observable selectMute    = false

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
  initiateCall = async(contact, studentId) => {
    const data = await this.generateToken()
    this.setIsCalling(true)
    this.setCallBarVisible(true)

    this.contactName = this.contact.refs[0].name
    this.studentID   = studentId
    const phoneNumber = '6012128813'
    const token = data.data.token
    this.userId = data.data.user

    this.setupDevice(token)
    setTimeout(() =>
    this.connect(phoneNumber), 2000)
  }

  @action
  connect(number) {
    const params = {
      contact_id: this.contact.refs[0].id,
      student_id: this.studentID,
      tocall:     '6012128183',
      user_id:    this.userId
    }
 
    this.connection = Twilio.Device.connect(params)

    this.connection.accept((conn) => {
      console.log('accepted')
    })

    this.connection.disconnect((conn) => {
      this.setIsCalling(false)
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
    })
    .catch((error) => {
    })
  }

  @action
  initiateConferenceCall = async (contact, student_id) => {
    console.log(contact.refs[0].id)
    this.contactID   = contact.refs[0].id
    this.contactName = contact.refs[0].name
    this.phoneNumber = contact.refs[0].phone
    this.studentID   = student_id
    
    const data = await this.generateToken()
    const token = data.data.token
    this.userId = data.data.user

    console.log(await this.conferenceCall())

  }

  @action
  hangUp() {
    this.connection.disconnect()
    this.setIsCalling(false)
    setTimeout(() => 
    this.setCallBarVisible(false), 5000)
    this.isDialPad(false)
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
    catch(e) {
      console.log(e)
    }
  }
}

export default CallingStore = new CallingStore()