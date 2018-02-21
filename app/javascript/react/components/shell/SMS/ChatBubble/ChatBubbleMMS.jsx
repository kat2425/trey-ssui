import React      from 'react'
import ImageModal from 'ui/shell/ImageModal'
import styled     from 'styled-components'
import {prop}     from 'styled-tools'

export default class ChatBubbleMMS extends React.Component {
  state = { isOpen: false }

  toggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }))
  }

  getSize = (mode) => {
    return {
      fill: 'cover',
      fit:  'contain'
    }[mode]
  }

  render(){
    const { mode, src, ...rest} = this.props

    return (
      <Image 
        src     = {src}
        size    = {this.getSize(mode)}
        onClick = {this.toggle}
        {...rest}
      >
        <ImageModal src={src} isOpen={this.state.isOpen} toggle={this.toggle}/>
      </Image>
    )
  }
}

const Image = styled.div`
  cursor: pointer;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  background-image: url("${prop('src')}");
  background-size: ${prop('size', 'contain')};
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 150px;
`
