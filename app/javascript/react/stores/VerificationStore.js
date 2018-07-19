import {
  observable,
  computed,
  action
} from 'mobx'
import { setter } from 'mobx-decorators'
import xhr        from 'helpers/XHR'
import _          from 'lodash'
import uiStore    from 'stores/UiStore'
import getError   from 'helpers/ErrorParser'

export class VerificationStore {
  @observable emailCode                   = null
  @observable mobileCode                  = null
  @observable redirectSeconds             = 5
  @observable potentialId                 = null
  @observable passwordToken               = null
  @observable userId                      = null
  @observable email                       = null
  @observable phone                       = null

  @setter @observable passwordSuccess     = false
  @setter @observable isError             = null
  @setter @observable inProgress          = false
  @setter @observable isSaving            = false
  @setter @observable isFetchingUser      = false
  @setter @observable verificationSuccess = false
  @setter @observable currentStep         = STEPS.VERIFICATION

  steps = Object.values(STEPS)

  @computed get stepIndex() {
    return this.steps.indexOf(this.currentStep)
  }

  @computed get showError() {
    return _.has(this.isError, 'title')
  }

  @computed get errorTitle() {
    return _.get(this.isError, 'title', 'Error Submitting Codes')
  }

  @computed get errorMessage() {
    return _.get(this.isError, 'message', '')
  }

  @computed get emailInvalid() {
    return this.errorMessage === 'Invalid email verification key'
  }

  @computed get mobileInvalid() {
    return this.errorMessage === 'Invalid phone verification key'
  }

  @action submitCodes = async(values) => {
    try {
      this.setInProgress(true)
      this.setIsError(null)

      const { mobileCode, emailCode } = values

      const { data } = await xhr.put(`/potential_users/${this.potentialId}`, {
        phone: mobileCode,
        email: emailCode
      })

      this.verificationOk(data)
    } catch (err) {
      this.setIsError(getError(err))
    } finally {
      this.setInProgress(false)
    }
  }

  @action verificationOk = (data) => {
    this.setVerificationSuccess(true)
    this.passwordToken = data.password_token
    this.userId        = data.id
    this.setCurrentStep(STEPS.PASSWORD)

    uiStore.addMessage('Verification successful!')
  }

  @action setEmailCode = (text) => {
    this.emailCode = text
  }

  @action setMobileCode = (text) => {
    this.mobileCode = text
  }

  @action startRedirectTimer = (callback) => {
    this.redirectTimerId = setTimeout(() => {      
      this.redirectSeconds = this.redirectSeconds - 1

      if(this.redirectSeconds === 0) {
        clearTimeout(this.redirectTimerId)
        callback()
      }
    }, 1000)
  }

  @action getPotentialUser = async(id, callback) => {
    try {
      this.setIsFetchingUser(true)

      const { data } = await xhr.get(`/potential_users/${id}`)

      this.getPotentialUserOk(data)
    } catch(e) {
      callback()
    } finally {
      this.setIsFetchingUser(false)
    }
  }

  @action getPotentialUserOk = (data) => {
    const{ id, phone, email } = data

    this.potentialId = id
    this.phone       = phone
    this.email       = email 
  }

  @action submitPassword = async(password) => {
    try {
      this.setInProgress(true)
      this.setIsError(null)

      await xhr.put(`/auth/reset/${this.userId}`,
        {
          token: this.passwordToken,
          password
        },
        {
          timeout: 15000
        }
      )
      
      this.submitPasswordOk()
    } catch (err) {
      this.setIsError({ errors: `We're having trouble getting through to our server!`, message: `Uh-oh!` })
    } finally {
      this.setInProgress(false)
    }
  }

  @action submitPasswordOk = () => {
    this.setPasswordSuccess(true)
    this.setCurrentStep(STEPS.LOGIN)

    uiStore.addMessage('Password created successfully!')
  }
}

export const STEPS = {
  VERIFICATION: 'Verification',
  PASSWORD:     'Password',
  LOGIN:        'Login'
}

export default new VerificationStore()
