import React, { Component } from 'react'
import Iframe               from 'react-iframe'

export default class FeedbakLegacy extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cacheBust = Number(new Date())

    return (
      <Iframe
        url = {`https://feedbak-ss-ui.s3.amazonaws.com/index.html#?token=${window.SSUser.accessToken}&qcb=${cacheBust}`}
        styles = {{marginTop: '-1.5rem', height: '100vh'}}
      />
    )
  }
}
