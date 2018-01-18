import React, {Component} from 'react'
import PropTypes          from 'prop-types'

import Wrapper            from './Wrapper'
import Image              from './Image'
import ClearButton        from './ClearButton'
import AttachmentModal    from './AttachmentModal'

export default class Attachment extends Component{
  static propTypes = {
    onClear: PropTypes.func.isRequired,
    src:     PropTypes.string.isRequired
  }

  state = { isOpen: false }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    const {src, onClear} = this.props

    return (
      <Wrapper >
        <ClearButton onClick={onClear} />
        <Image src={src} onClick={this.toggle}/>
        <AttachmentModal src={src} isOpen={isOpen} toggle={this.toggle}/>
      </Wrapper>
    )
  }
}

