import React, {Component}                   from 'react'
import {observer}                           from 'mobx-react'

import ReactMapboxGl, {GeoJSONLayer, Popup} from 'react-mapbox-gl'

import {token, styles, mapStyle}            from './config'
import {addClusterLayers, source}           from './layers'

import Wrapper                              from './Wrapper'
import LeftControlPanel                     from './LeftControlPanel'
import StudentInfo                          from './StudentInfo'

import mapStore                             from 'stores/MapStore'

const Map = ReactMapboxGl({accessToken: token, trackResize: false})

@observer
export default class MapView extends Component {
  center = [-90.1123, 32.4001]

  state = {
    width:  this.props.width || '500px',
    height: this.props.height || '500px'
  }

  componentDidMount() {
    mapStore.fetchGeoJSON(this.props.tag)
  }

  componentWillReceiveProps({width: nWidth, height: nHeight}){
    const { width, height } = this.state

    if(nWidth !== width || nHeight !== height){
      this.setState({ width: nWidth, height: nHeight })
    }
  }

  componentDidUpdate(){
    mapStore.map && mapStore.map.resize()
  }

  componentWillUnmount() {
    mapStore.clear()
  }

  onStyleLoad = map => {
    mapStore.setMap(map)
    addClusterLayers(map)
  }

  render() {
    const {width, height}   = this.state
    const {selectedStudent} = mapStore

    return (
      <Wrapper style={{width, height}}>
        <Map
          style          = {styles.dark}
          center         = {this.center}
          containerStyle = {mapStyle}
          onStyleLoad    = {this.onStyleLoad}
          accessToken    = {token}
          onClick        = {() => mapStore.setSelectedStudent(null)}
        >
          <GeoJSONLayer
            id            = {source}
            data          = {mapStore.geoData}
            circleOnClick = {mapStore.handleMarkerClick}
            circleLayout  = {{visibility: 'visible'}}
            sourceOptions = {{
              cluster:       true,
              clusterRadius: 50
            }}
          />
          {selectedStudent && (
            <Popup
              anchor      = 'bottom'
              key         = {selectedStudent.id}
              coordinates = {selectedStudent.position}
            >
              <StudentInfo student={selectedStudent} />
            </Popup>
          )}
        </Map>
        <LeftControlPanel />
      </Wrapper>
    )
  }
}
