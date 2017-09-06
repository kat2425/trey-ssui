import { observable, action, computed, runInAction, autorun, toJS } from 'mobx'
import {setter} from 'mobx-decorators'

import _   from 'lodash'
import xhr from 'helpers/XHR'
import axios from 'axios'

class CallingStore {
  @setter @observable isCalling = false
  @setter @observable callBarVisible   = false
  @observable studentID         = null
  @observable phoneNumber       = null
  @observable contactName       = null
  @observable contactPhone      = null
  @observable token             = null
  @observable userId            = null
  @observable connection        = null
  @observable contactID         = null
  @observable contact           = null
  @setter @observable selectCall = false

  @action
  generateToken = () => {
    return xhr.get('/commo/capability_token')
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error)
    })
  }

  @action
  call = async(contact, studentId) => {
    const data = await this.generateToken()
    this.setIsCalling(true)
    this.setCallBarVisible(true)

    
    this.contactID   = contact.refs[0].id
    this.contactName = contact.refs[0].name
    this.phoneNumber = contact.refs[0].phone
    this.studentID   = studentId
  
    const token = data.data.token
    this.userId = data.data.user

    this.setupDevice(token)
    setTimeout(() =>
    this.connect(this.phoneNumber), 2000)
  }

  @action
  connect(number) {
    const params = {
      contact_id: this.contactID,
      student_id: this.studentID,
      tocall:     number,
      user_id:    this.userId
    }
    console.log(number)
    this.connection = Twilio.Device.connect(params)
    
    this.connection.accept((conn) => {
      console.log('accepted')
    })
    this.connection.disconnect((conn) => 
      console.log('DISCONNECTED')
  )

  Twilio.Device.incoming(function(conn) {
    console.log(conn)
  });
  }

  @action
  hangUp() {
    this.connection.disconnect()
    this.setIsCalling(false)
    setTimeout(() => 
    this.setCallBarVisible(false), 5000)
  }

  @action.bound
  selectCallOption(bool) {
    this.setSelectCall(bool)
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
    console.log(contact)
    this.contactID   = contact.refs[0].id
    this.contactName = contact.refs[0].name
    this.phoneNumber = contact.refs[0].phone
    this.studentID   = student_id
    
    const data = await this.generateToken()
    const token = data.data.token
    this.userId = data.data.user

    console.log(await this.conferenceCall())

  }

}

export default CallingStore = new CallingStore()