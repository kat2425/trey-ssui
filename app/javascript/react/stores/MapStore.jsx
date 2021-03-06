import { 
  observable, 
  action, 
  autorun, 
  computed,
  toJS
} from 'mobx'

import _                     from 'lodash'
import { setter }            from 'mobx-decorators'
import { QUERY_XHR as qxhr } from 'helpers/XHR'
import getError              from 'helpers/ErrorParser'
import UiStore               from 'stores/UiStore'
import turf                  from 'turf'

const headers = {
  headers: {
    'Accept': 'application/geo+json'
  }
}

export class MapStore {
  @setter @observable map        = null

  @setter @observable isError    = null
  @setter @observable isFetching = false

  @setter @observable geoData    = null
  @setter @observable student    = null

  constructor() {
    this.initAutoruns()
  }

  // Computed
  @computed get selectedStudent(){
    return toJS(this.student)
  }

  @computed get totalStudents() {
    return _.get(this.geoData,'features.length', 0)
  }

  @action initAutoruns = () => {
    this.autoErrorNotifier()
    this.autoMapFitBounds()
  }

  @action autoMapFitBounds = () => {
    this.autoFitBoundDisposer = autorun('Fit bounds', () => {
      if(_.isEmpty(this.map) || _.isEmpty(this.geoData)) return
      this.fitBounds()
    }
    )
  }

  @action autoErrorNotifier = () => {
    this.autoErrorDisposer = autorun('Watch errors', () => {
      if (this.isError && !this.isError.hideNotification) {
        UiStore.addNotification({ 
          title:   this.isError.title,
          message: this.isError.message,
          type:    this.isError.type || 'error'
        })
      }
    })
  }

  @action fetchGeoJSON = async(tag) => {
    if(!tag.isValid){ return }

    try {
      this.setIsFetching(true)
      this.setIsError(false)

      const { data } = await qxhr.post('/query/fetch', 
        {query: tag.queryFormat }, 
        headers
      )

      this.setGeoData(data)
      this.fitBounds()
    } catch (e) {
      this.setIsError(getError(e))
    } finally {
      this.setIsFetching(false)
    }
  }

  @action handleMarkerClick = (evt) => {
    const {lngLat, features} = evt
    const {properties}       = features[0]
    const position = [lngLat.lng, lngLat.lat]

    if(!this.isValidCoordinate(lngLat) || properties.cluster) return

    this.student = {
      position,
      ...properties
    }
  }

  @action setSelectedStudent = (val) => {
    this.student = val
  }

  @action clear = () => {
    this.student = null
    this.geoData = null
  }

  @action isValidCoordinate = s => (
    _.isFinite(s.lng) && 
    _.isFinite(s.lat)
  )

  @action fitBounds = () => {
    try{
      this.setIsError(false)

      if(_.isEmpty(this.map) || _.isEmpty(_.get(this.geoData, 'features', 0))) return

      this.map.fitBounds(turf.bbox(this.geoData), {padding: 20})
    } catch(e){
      this.setIsError(getError(e))
    }
  }

  @action dispose = () => {
    this.autoErrorNotifier && this.autoErrorNotifier()
    this.autoFitBoundDisposer && this.autoFitBoundDisposer()
  }
}

export default new MapStore()
