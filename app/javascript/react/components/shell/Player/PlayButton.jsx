import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import {prop}    from 'styled-tools'

import {
  MdPlayArrow,
  MdPlayCircleOutline,
  MdPlayCircleFilled,
  MdPauseCircleOutline,
  MdPauseCircleFilled,
  MdPause
} from 'react-icons/lib/md'

PlayButton.propTypes = {
  playing:      PropTypes.bool,
  onTogglePlay: PropTypes.func,
  size:         PropTypes.number
}

export default function PlayButton({playing = false, onTogglePlay, size}) {
  return (playing) 
    ? <Pause size={size} onClick={onTogglePlay} /> 
    : <Play size={size} onClick={onTogglePlay} />
}

const getStyledIcon = (Icon) => styled(Icon)`
 width: ${prop('size', '26px')};
 height: ${prop('size', '26px')};
 margin-left: -8px;
 margin-right: 5px;

 cursor: pointer; 
 color: #505050;
 &:hover{
  opacity: 0.9;
 }
`

const Play = getStyledIcon(MdPlayArrow)
const PlayOutline = getStyledIcon(MdPlayCircleOutline)
const PlayFilled = getStyledIcon(MdPlayCircleFilled)

const Pause = getStyledIcon(MdPause)
const PauseOutline = getStyledIcon(MdPauseCircleOutline)
const PauseFilled = getStyledIcon(MdPauseCircleFilled)
