import React, {Component} from 'react'
import { observer }       from 'mobx-react'

import StudentPin         from './StudentPin'
import StudentInfo        from './StudentInfo'
import RightControlPanel  from './RightControlPanel'
import LeftControlPanel   from './LeftControlPanel'

import MapGL, {
  Marker, 
  Popup, 
  FlyToInterpolator
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import tagStore from 'stores/TagStore'

@observer
export default class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude:  30.776464864611626,
        longitude: -89.58102755248547,
        zoom:      8,
        bearing:   0,
        pitch:     0,
        width:     500,
        height:    500
      },
      popupInfo: null
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width:  this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    })
  }

  updateViewport = (viewport) => {
    this.setState({viewport})
  }

  renderStudentMarker = (student, index) => {
    return (
      <Marker
        key       = {`marker-${index}`}
        longitude = {student.longitude}
        latitude  = {student.latitude}
      >
        <StudentPin size={20} onClick={this.handleOnMarkerClick(student)} />
      </Marker>
    )
  }

  handleOnMarkerClick = (student) => () => {
    this.setState({popupInfo: student} )

    this.updateViewport({
      ...this.state.viewport,
      latitude:               student.latitude,
      longitude:              student.longitude,
      zoom:                   10,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration:     500
    })
  }

  _renderPopup = () => {
    const {popupInfo} = this.state

    return (
      popupInfo && (
        <Popup
          tipSize   = {5}
          anchor    = 'top'
          longitude = {popupInfo.longitude}
          latitude  = {popupInfo.latitude}
          onClose   = {() => this.setState({popupInfo: null})}
        >
          <StudentInfo student={popupInfo} />
        </Popup>
      )
    )
  }

  render() {
    const { viewport }    = this.state
    const { selectedTag } = tagStore

    if(!selectedTag) return null

    return (
      <MapGL
        {...viewport}
        mapStyle         = 'mapbox://styles/mapbox/streets-v9'
        onViewportChange = {this.updateViewport}
        ref              = {map => this.mapRef = map}
      >
        {selectedTag.studentsCoordinates.map(this.renderStudentMarker)}
        {this._renderPopup()}
        {<RightControlPanel />}
        {<LeftControlPanel />}
      </MapGL>
    )
  }
}
