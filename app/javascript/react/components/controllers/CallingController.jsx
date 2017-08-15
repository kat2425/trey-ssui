import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import {
  Navbar
} from 'reactstrap'

const style = {
  callBar: {
    zIndex: 1040,
    height: 57,
    backgroundColor: 'rgba(217,83,79,0.95)'
  }
}

export default class CallingController extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  renderBar() {
    const { callBar } = style

    if (this.state.visible) {
      return (
        <Navbar style={callBar} fixed='top'>
          hello
        </Navbar>
      )
    }
  }

  render() {
    return <div>{this.renderBar()}</div>
  }
}
