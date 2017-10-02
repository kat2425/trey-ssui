import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import toNumber           from 'lodash.tonumber'

import Wrapper            from './Wrapper'
import InnerWrapper       from './InnerWrapper'
import PlayButton         from './PlayButton'
import Timer              from './Timer'
import Slider             from './Slider'
import VolumeBar          from './VolumeBar'
import Progress           from './Progress'

export default class Player extends Component{
  static propTypes = {
    src: PropTypes.string
  }

  constructor(props){
    super(props)

    this.state = this.getInitialState()
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.src){
      this.reset()
    } else if(nextProps.src != this.props.src){
      this.setState({src: nextProps.src})
      this.handleOnEnded()
    }
  }

  play = () => {
    this.setState({play: true})
    this.audioEl.play()
  } 

  pause = () => {
    this.setState({play: false})
    this.audioEl.pause()
  } 

  toggleMute = () => {
    if(this.state.mute){
      this.prevVolume = this.state.volume
      this.setVolume(0)
    } else {
      this.setVolume(this.prevVolume)
    }
  }

  handleOnToggleMute = () => {
    this.setState((prevState) => ({mute: !prevState.mute}), this.toggleMute)
  }

  handleOnTogglePlay = () => {
    this.state.play ? this.pause() : this.play() 
  }

  handleOnLoadStart = () => {
    this.setState({loading: true})
  }

  handleOnLoadedData = () => {
    this.setState({loading: false})
  }

  handleOnError = () => {
    this.handleOnEnded()
    this.setState({
      disable: true
    })
  }

  getInitialState = () => ({
    play:        false,
    src:         this.props.src,
    progress:    0,
    loading:     false,
    currentTime: 0,
    duration:    0,
    mute:        false,
    volume:      1
  })

  reset = () => {
    this.setState(this.getInitialState())
  }

  handleOnEnded = () => {
    this.setState({play: false})
  }

  handleOnLoadedMetadata = () => {
    this.setState({
      disable:  !this.audioEl.duration,
      duration: this.audioEl.duration || 0,
      volume:   (this.audioEl.volume * 100)
    })
  }

  updateProgress = () => {
    const duration    = this.audioEl.duration
    const currentTime = this.audioEl.currentTime
    const progress    = (currentTime * 100) / duration

    this.setState({ 
      duration,
      currentTime,
      progress: progress ? progress : 0
    })
  }

  handleOnSliderChange = (value) => {
    const currentTime = toNumber((this.state.duration * value) / 100)

    this.audioEl.currentTime = currentTime
    this.setState({progress: value})
    this.play()
  }
 
  // scale 0 - 100
  setVolume = (volume) => { 
    this.setState({ volume, mute: !volume }, 
      () => {
        this.audioEl.volume = toNumber(this.state.volume / 100)
      }
    )
  }

  handleOnVolumeChange = (value) => {
    this.setVolume(value)
  }


  setAudioRef = el => {
    this.audioEl = el
  } 

  render(){
    const {
      play,
      loading,
      currentTime,
      duration,
      progress,
      volume,
      src,
      mute
    } = this.state

    return (
      <Wrapper disabled={!duration}>
        <PlayButton 
          playing          = {play}
          loading          = {loading}
          onTogglePlay     = {this.handleOnTogglePlay}
        />
        <Timer 
          currentTime      = {currentTime}
          duration         = {duration}
        />
        {!duration && <Progress />}
        { !!duration && (
          <InnerWrapper>
            <Slider
              onChange         = {this.handleOnSliderChange}
              value            = {progress ? progress : 0}
            />
            <VolumeBar
              onChange         = {this.handleOnVolumeChange}
              value            = {volume}
              mute             = {mute}
              onToggleMute     = {this.handleOnToggleMute}
            />
          </InnerWrapper>
        )}
        <audio 
          src              = {src}
          ref              = {this.setAudioRef}
          preload          = 'auto'
          onLoadStart      = {this.handleOnLoadStart}
          onLoadedData     = {this.handleOnLoadedData}
          onProgress       = {this.updateProgress}
          onTimeUpdate     = {this.updateProgress}
          onLoadedMetadata = {this.handleOnLoadedMetadata}
          onEnded          = {this.handleOnEnded}
          onError          = {this.handleOnError}
        />
      </Wrapper>
    )
  }
}
 
