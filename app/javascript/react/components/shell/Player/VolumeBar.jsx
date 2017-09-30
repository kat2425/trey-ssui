import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import {prop}    from 'styled-tools'

import Slider    from './Slider'

import {
  MdVolumeOff,
  MdVolumeUp
} from 'react-icons/lib/md'

VolumeBar.propTypes = {
  mute:           PropTypes.bool,
  onToggleMute:   PropTypes.func,
  onVolumeChange: PropTypes.func,
  size:           PropTypes.number
}

export default function VolumeBar({mute, onToggleMute, onVolumeChange, className, size, style, ...rest}) {
  return (
    <Wrapper className={className} style={style}>
      <VolumeButton mute={mute} onToggleMute={onToggleMute} size={size}/>
      <Slider onChange={onVolumeChange} {...rest} />
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({
  className: props => `d-flex align-items-center ${props.className}`
})`
  flex: 1;
  flex-basis: 100px;
  margin-left: 20px;
`

function VolumeButton({ mute = false,  size, onToggleMute}) {
  return (mute) 
    ? <Mute size={size} onClick={onToggleMute}/> 
    : <Volume size={size} onClick={onToggleMute}/>
}

const getStyledIcon = (Icon) => styled(Icon)`
 cursor: pointer; 
 color: #505050;
 margin-right: 10px;

 width: ${prop('size', '33px')};
 height: ${prop('size', '30px')};

 &:hover{
  opacity: 0.9;
 }
`

const Volume = getStyledIcon(MdVolumeUp)
const Mute = getStyledIcon(MdVolumeOff)

