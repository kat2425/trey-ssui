import React, { Component } from 'react'
import Iframe               from 'react-iframe'

export default class FeedbakLegacy extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Iframe
        url = {`https://feedbak-ss-ui.s3.amazonaws.com/index.html#?token=${window.SSUser.accessToken}`}
        styles = {{marginTop:'-1.5rem'}}
      />
    )
  }
}
