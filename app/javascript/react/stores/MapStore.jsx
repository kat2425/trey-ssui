import { observable, action, autorun } from 'mobx'
import { setter }                      from 'mobx-decorators'
import { QUERY_XHR as qxhr }           from 'helpers/XHR'
import getError                        from 'helpers/ErrorParser'
import UiStore                         from 'stores/UiStore'

const headers = {
  headers: {
    'Content-Type': 'application/geo+json'
  }
}

export class MapStore {
  @setter @observable isError    = null
  @setter @observable isFetching = false
  @observable geoData            = []

  constructor() {
    this.initAutoruns()
  }

  // Autoruns
  autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        UiStore.addNotification({ title: this.isError.title, message: this.isError.message, type: 'error' })
      }
    })
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
  }

  @action
  fetchGeoJSON = async(query) => {
    try {
      this.setIsFetching(true)
      this.setIsError(false)

      const { data } = await qxhr.post('/query/fetch',
        { query },
        headers
      )

      this.geoData = data
    } catch (e) {
      const error = getError(e)

      this.setIsError({
        message: error.message,
        title:   error.title
      })
      console.error(e)
    } finally {
      this.setIsFetching(false)
    }
  }
}

const singleton = new MapStore()

export default singleton

