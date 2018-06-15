import xhr      from 'helpers/XHR'
import getError from 'helpers/ErrorParser'
import {setter} from 'mobx-decorators'
import uiStore  from 'stores/UiStore'
import _        from 'lodash'

import { 
  observable,
  computed,
  action,
  autorun
} from 'mobx'

export const STEPS = {
  USERNAME_VERIFICATION: 'Username Verification',
  DELIVERY_METHOD:       'Delivery Method',
  CONFIRMATION_CODE:     'Confirmation Code',
  NEW_PASSWORD:          'New Password'
}

export const STEPS_TO_URL = {
  [STEPS.USERNAME_VERIFICATION]: '/reset',
  [STEPS.DELIVERY_METHOD]:       '/reset/delivery_method',
  [STEPS.CONFIRMATION_CODE]:     '/reset/confirmation_code',
  [STEPS.NEW_PASSWORD]:          '/reset/new_password'
}

export class ResetPasswordStore {
  history                                       = null
  steps                                         = Object.values(STEPS)
  @observable previousStep                      = null

  @observable currentStep                       = STEPS.USERNAME_VERIFICATION
  @observable confirmationCode                  = null

  @setter @observable deliveryMethod            = 'email'

  @setter @observable isVerifyingUsername       = false
  @setter @observable isSendingConfirmationCode = false
  @setter @observable isConfirmingCode          = false
  @setter @observable isSendingNewPassword      = false

  @setter @observable isError                   = null
  @setter @observable user                      = null

  constructor(){
    this.autoURLChange()
  }

  @computed get showError(){
    return _.has(this.isError, 'message')
  }

  @computed get errorTitle(){
    return _.get(this.isError, 'title', 'Error')
  }

  @computed get errorMessage(){
    return _.get(this.isError, 'message', '')
  }

  @computed get current(){
    return this.steps.indexOf(this.currentStep)
  }

  @computed get showUsernameVerification(){
    return this.currentStep === STEPS.USERNAME_VERIFICATION
  }

  @computed get showDeliveryMethod(){
    return this.currentStep === STEPS.DELIVERY_METHOD
  }
  
  @computed get showConfirmationCode(){
    return this.currentStep === STEPS.CONFIRMATION_CODE
  }

  @computed get showNewPassword(){
    return this.currentStep === STEPS.NEW_PASSWORD
  }

  @action verifyUsername = async(username) => {
    try {
      this.setIsVerifyingUsername(true)
      this.setIsError(false)

      const params         = { username }
      const { data: user } = await xhr.get('auth/verify_username', {params})

      this.verifyUsernameOK(user)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsVerifyingUsername(false)
    }
  }

  @action verifyUsernameOK = (user) => {
    uiStore.addMessage('Username verified successfully')
    this.setUser(user)
    this.setCurrentStep(STEPS.DELIVERY_METHOD) 
  }


  @action sendDeliveryMethod = async(delivery = 'email') => {
    try {
      this.setIsSendingConfirmationCode(true)
      this.setIsError(false)

      await xhr.post(`auth/reset/${this.user.id}`, this.getDeliveryFormData(delivery), { 
        'Content-Type': 'multipart/form-data'
      })

      this.sendDeliveryMethodOK(delivery)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsSendingConfirmationCode(false)
    }
  }

  @action sendDeliveryMethodOK = (delivery) => {
    this.setDeliveryMethod(delivery)

    uiStore.addMessage(`Confirmation code sent via ${delivery}`)

    this.setCurrentStep(STEPS.CONFIRMATION_CODE) 
  }

  @action getDeliveryFormData = (delivery) => {
    const data = new FormData()

    data.append('delivery', delivery)
    return data
  }

  @action verifyCode = async(code) => {
    try {
      this.setIsConfirmingCode(true)
      this.setIsError(false)

      const params = { token: code }

      await xhr.get(`auth/verify_token/${this.user.id}`, {params})

      this.verifyCodeOK(code)
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsConfirmingCode(false)
    }
  }

  @action verifyCodeOK = (code) => {
    this.setConfirmationCode(code)

    uiStore.addMessage('Code verified successfully')

    this.setCurrentStep(STEPS.NEW_PASSWORD) 
  }

  @action sendNewPassword = async(password) => {
    try {
      this.setIsSendingNewPassword(true)
      this.setIsError(false)

      await xhr.put(`auth/reset/${this.user.id}`, this.getResetFormData(this.confirmationCode, password), { 
        'Content-Type': 'multipart/form-data'
      })

      this.sendNewPasswordOK()
    } catch(e){
      this.setIsError(getError(e))
    } finally {
      this.setIsSendingNewPassword(false)
    }
  }

  @action sendNewPasswordOK = () => {
    uiStore.addMessage('Password changed successfully.')
    window.location.replace('/login')
  }


  @action getResetFormData = (token, password) => {
    const data = new FormData()

    data.append('token', token)
    data.append('password', password)
    return data
  }

  @action autoURLChange = () => {
    this.autoURLChangeDisposer = autorun('auto url change', () => {
      const { USERNAME_VERIFICATION, DELIVERY_METHOD, CONFIRMATION_CODE, NEW_PASSWORD } = STEPS

      if(!this.previousStep) return

      switch(this.currentStep){
      case USERNAME_VERIFICATION:
        this.history.push(STEPS_TO_URL[USERNAME_VERIFICATION])
        return
      case DELIVERY_METHOD:
        this.history.push(`${STEPS_TO_URL[DELIVERY_METHOD]}/${this.user.id}`)
        return
      case CONFIRMATION_CODE:
        this.history.push(`${STEPS_TO_URL[CONFIRMATION_CODE]}/${this.user.id}`)
        return
      case NEW_PASSWORD:
        this.history.push(`${STEPS_TO_URL[NEW_PASSWORD]}/${this.user.id}`)
        return
      default:
        this.setCurrentStep(USERNAME_VERIFICATION)
      }
    })
  }

  @action setCurrentStep = (step) => {
    this.previousStep = this.currentStep
    this.currentStep = step
  }

  @action setHistory = (history) => {
    this.history = history
  }

  @action setUserId = (id) => {
    this.setUser({id})
  }

  @action setConfirmationCode(code){
    this.confirmationCode = code
  }
}

export default new ResetPasswordStore()
