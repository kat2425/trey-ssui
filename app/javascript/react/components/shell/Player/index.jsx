import React, {Component} from 'react'
import styled             from 'styled-components'


const Audio = styled.audio`
  width: 100%;
  max-width: 100%;
`

export default class Player extends Component{
  render(){
    const {src} = this.props

    return (
      <Audio controls preload='false'>
        <source src={src} />
      </Audio>
    )
  }
}
