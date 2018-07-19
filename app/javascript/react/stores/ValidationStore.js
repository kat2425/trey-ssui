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
  @observable questions               = observable.map()
  @observable addressAnswer           = null
  @observable dateAnswer              = null
  @observable steps                   = null
  @observable user                    = null

  @observable @setter isFetchingUser  = false
  @observable @setter isSaving        = false
  @observable @setter validationID    = null
  @observable @setter currentQuestion = 0
  @observable @setter isFetching      = false
  @observable @setter isFinished      = false
  @observable @setter isFetchError    = false

  @computed get isEmpty() {
    return !this.questions.size
  }

  @action fetchQuestions = async() => {
    this.setIsFetching(true)
    this.setIsFetchError(false)

    try {
      const { data } = await xhr.get('/parent_user_validations', {
        params: {
          only_unattempted: true,
          only:             ['id', 'questions'].join(',')
        }
      })

      if (_.isEmpty(data)) {
        this.setIsFinished(true)
      }

      this.setQuestions(data)
    } catch (err) {
      this.setIsFetchError(true)
    } finally {
      this.setIsFetching(false)
    }
  }

  @action setQuestions = (data) => {
    data.forEach((q) => {
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

      if (!data.user.unattempted_validations) {
        return this.setIsFinished(true)
      }

      this.onSubmitOk()
    } catch(err) { 
      uiStore.addNotification({ 
        title:   'Error', 
        message: `Looks like we're having trouble submitting your answers! Try again later!`
      })
    } finally {
      this.setIsSaving(false)
    }
  }

  @action onSubmitOk = () => {
    this.setCurrentQuestion(this.currentQuestion + 1)
  }
}

export default new ValidationStore()