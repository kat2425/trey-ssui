/**
 * JSON representation of a Contact from the server
 {
    id:           '77f6d9f8-f5b4-4bd9-a596-378979a125af',
    student_id:   '51db4bd8e9c77f81290001ec',
    name:         'Aaronson, Able T',
    phone:        '(Home) 601-878-4185',
    email:        'levi@schoolstatus.com',
    relationship: 'Tester',
    resides_with: null,
    checkout:     null,
    emergency:    null,
    no_contact:   null,
    primary:      true,
    stopped:      false,
    student:      { full_name: 'John Brown' },
    flagged:      true,
    flagged_count: 4,
    flags: [{
      id: '12',
      note: 'I just don't like the guy',
      created_at: '2018-06-05T16:54:41.136-05:00',
      user: {
        name: 'Ableseed, Jacob T',
        phone: '(Home) 601-878-4185',
      }
    },{
      id: '14',
      note: 'I just don't like the guy',
      created_at: '2018-06-05T16:54:41.136-05:00',
      user: {
        name: 'Aaronson, Able T',
        phone: '(Home) 601-878-4185',
      }
    }]
  }
*/

import { 
  observable, 
  action, 
  computed,
  autorun
} from 'mobx'

import { setter }           from 'mobx-decorators'
import _                    from 'lodash'

import xhr                  from 'helpers/XHR'
import fireEvent            from 'helpers/FireEvent'
import getError             from 'helpers/ErrorParser'

import uiStore              from 'stores/UiStore'
import userStore            from 'stores/UserStore'
import callingStore         from 'stores/CallingStore'

import Flag                 from 'stores/models/Flag'


export default class Contact {
  id                                           = null
  parentStore                                  = null

  @setter @observable studentId                = null
  @setter @observable student                  = null
  @setter @observable name                     = null
  @setter @observable note                     = ''
  @setter @observable phone                    = null
  @setter @observable email                    = null
  @setter @observable relationship             = null
  @setter @observable residesWith              = null
  @setter @observable checkout                 = null
  @setter @observable emergency                = null
  @setter @observable noContact                = null
  @setter @observable numberType               = null
  @setter @observable avatarUrl                = null

  @setter @observable flagsCount               = 0
  @setter @observable flags                    = []
  @setter @observable flagged                  = false

  @setter @observable isError                  = false
  @setter @observable isFlagging               = false
  @setter @observable isUnFlagging             = false
  @setter @observable isFetchingNumCapability  = false
  @setter @observable isUpdatingContactPrimary = false

  @setter @observable primary                  = false
  @setter @observable stopped                  = false

  constructor(store, json){
    this.parentStore = store

    this.updateFromJSON(json)

    this.initAutoruns()

    this.fetchNumberCapability()
  }

  // Computed
  @computed get isTextingDisabled(){
    return this.numberType !== 'mobile' || this.stopped
  }

  @computed get hasFlags(){
    return !_.isEmpty(this.flags)
  }

  @computed get dataSource(){
    return _
      .orderBy(this.flags, f => f.createdAt, 'desc')
      .map(f => ({ ...f.toJS, key: f.id }))
  }

  @computed get showContactFlagging() {
    return userStore.isBetaTester
  }

  @computed get canUnflag(){
    return (
      !this.isUnFlagging &&
      this.flags.length &&
      _.some(this.flags, { userId: userStore.user.id })
    )
  }

  // Actions
  @action updateFromJSON = ({
    id,
    student_id: studentId,
    name,
    phone,
    email,
    relationship,
    resides_with: residesWith,
    checkout,
    emergency,
    no_contact: noContact,
    primary,
    stopped,
    student,
    flagged,
    flags_count: flagsCount,
    note = '',
    flags = [],
    avatarUrl: avatarUrl
  }) => {
    this.id           = id
    this.studentId    = studentId
    this.name         = name || 'N/A'
    this.phone        = phone
    this.email        = email
    this.relationship = relationship
    this.residesWith  = residesWith
    this.checkout     = checkout
    this.emergency    = emergency
    this.noContact    = noContact
    this.primary      = primary
    this.stopped      = stopped
    this.student      = student
    this.note         = note
    this.avatarUrl    = avatarUrl

    this.flagsCount   = flagsCount
    this.flagged      = flagged

    this.flags        = flags.map(this.createFlag)
  }

  // Services
  @action flagInvalidNumber = async() => {
    try {
      this.setIsFlagging(true)
      this.setIsError(false)

      const res = await xhr.put(`/contacts/${this.id}/flag`, {
        flag: !this.flagged,
        note: this.note
      })

      this.flagInvalidNumberOK(res)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsFlagging(false)
    }
  }

  @action flagInvalidNumberOK = (res) => {
    uiStore.addMessage(`Contact flagged successfully`)

    this.updateFromJSON(res.data)
    this.parentStore.toggleFlagFormModal()
  }

  @action fetchNumberCapability = async() => {
    try {
      if(!this.phone) { return }
      if(!userStore.user.hasChannel) { return }

      this.setIsFetchingNumCapability(true)
      this.setIsError(false)

      const res = await xhr.post('/commo/validate_number', {
        number: this.phone
      })

      this.fetchNumberCapabilityOK(res)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsFetchingNumCapability(false)
    }
  }

  @action fetchNumberCapabilityOK({data}) {
    this.setNumberType(data.type)
  }


  @action updateContactPrimary = async() => {
    try {
      this.setIsUpdatingContactPrimary(true)
      this.setIsError(false)

      const res = await xhr.put(`/contacts/${this.id}/primary`, {
        primary: !this.primary
      })

      this.updateContactPrimaryOK(res)
    } catch(e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsUpdatingContactPrimary(false)
    }
  }

  @action updateContactPrimaryOK = (res) => {
    this.updateFromJSON(res.data)
    uiStore.addMessage( res.data.primary ? 'Contact added as primary' : 'Contact removed as primary')
  }

  @action createFlag = (flag) => {
    return new Flag(this, flag)
  }

  // Autoruns
  initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action autoErrorNotifier = () => {
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

  @action dispose = () => {
    this.autoErrorDisposer && this.autoErrorDisposer()
  }

  @action clearErrors = () => {
    this.setIsError(false)
  }

  @action initiateCall = () => {
    callingStore.setShowCallDialog(true)
    callingStore.contact   = this
    callingStore.studentID = this.studentId
  }

  @action initiateText = () => {
    fireEvent('toggleSidebar', {contact: this})
  }

  @action initiateEmail = () => {
    fireEvent('showMailer', {
      type: 'individual',
      id:   this.id,
      name: this.name
    })
  }

  @action unFlagNumber = async() => {
    try {
      this.setIsUnFlagging(true)
      this.setIsError(false)

      const { data } = await xhr.delete(`/contacts/${this.id}/flag`)

      this.unFlagNumberOK(data)
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsUnFlagging(false)
    }
  }

  @action unFlagNumberOK = (contact) => {
    this.updateFromJSON(contact)
    uiStore.addMessage(`Contact unflagged successfully`)
  }
}
