import {
  observable,
  action,
  computed
} from 'mobx'
import xhr        from 'helpers/XHR'
import _          from 'lodash'
import { setter } from 'mobx-decorators'
import uiStore    from 'stores/UiStore'

export class ValidationStore {
  @observable questions                    = observable.map()
  @observable addressAnswer                = null
  @observable dateAnswer                   = null

  @observable @setter justAttempted        = false
  @observable @setter isFetchingUser       = false
  @observable @setter isSaving             = false
  @observable @setter isSkipping           = false
  @observable @setter validationID         = null
  @observable @setter currentIndex         = 0
  @observable @setter isFetching           = false
  @observable @setter isFetchError         = false
  @observable @setter hasVerified          = false

  @computed get isSubmitting() {
    return this.isSaving || this.isSkipping
  }

  @computed get isEmpty() {
    return !this.questions.size
  }

  @computed get orderedValidations() {
    return _.orderBy(this.questions.values(), t => t.validation_status === 'pending', 'desc')
  }

  @computed get currentQuestion() {
    return this.orderedValidations[this.currentIndex]
  }

  @action fetchQuestions = async() => {
    this.setIsFetching(true)
    this.setIsFetchError(false)

    try {
      const { data } = await xhr.get('/parent_user_validations', {
        params: {
          only: [
            'id',
            'questions',
            'validation_status',
            'user.unattempted_validations',
            'user.verified_validations',
            'unattempted'
          ].join(',')
        }
      })
      
      this.setQuestions(data)
    } catch (err) {
      this.setIsFetchError(true)
    } finally {
      this.setIsFetching(false)
    }
  }

  @action setQuestions = (data) => {  
    if(!_.isEmpty(data)) {
      this.setHasVerified(data[0].user.verified_validations)
    }

    data
      .filter((q) => q.unattempted_validations)
      .forEach((q) => {
        this.questions.set(q.id, q)
      })
  }

  @action onSubmit = async({ addressId, dateId }) => {
    this.setIsSaving(true)

    try {
      const { data } = await xhr.put(`/parent_user_validations/${this.validationID}/answer`, {
        id:               this.validationID,
        address_id:       addressId,
        date_of_birth_id: dateId
      })

      this.onSubmitOk(data)
    } catch (err) {
      uiStore.addNotification({
        title:   'Error',
        message: `Looks like we're having trouble submitting your answers! Try again later!`
      })
    } finally {
      this.setIsSaving(false)
    }
  }


  @action onSkip = async() => {
    this.setIsSkipping(true)

    try {
      const { data } = await xhr.put(`/parent_user_validations/${this.validationID}/skip`, {
        id: this.validationID
      })

      this.onSkipOk(data)
    } catch (err) {
      uiStore.addNotification({
        title:   'Error',
        message: `Looks like we're having trouble submitting your answers! Try again later!`
      })
    } finally {
      this.setIsSkipping(false)
    }
  }

  @action onSubmitOk = ({id}, callback) => {
    this.setJustAttempted(true)
    this.goToNext(id)
    uiStore.addMessage('Successfully submitted validation!')

    callback()
  }

  @action onSkipOk = ({id}) => {
    this.goToNext(id)
    uiStore.addMessage('Successfully skipped validation!')
  }

  @action goToNext = (id) => {
    this.questions.delete(id)
    if(!this.isEmpty) this.setCurrentIndex(0)
  }
}

export default new ValidationStore()