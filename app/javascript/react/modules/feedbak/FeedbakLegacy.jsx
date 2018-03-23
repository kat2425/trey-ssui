import React, { Component } from 'react'
import Iframe               from 'react-iframe'
import uiStore              from 'stores/UiStore'

export default class FeedbakLegacy extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    uiStore.setIsFeedbakInUse(true)
  }

  componentWillUnmount() {
    uiStore.setIsFeedbakInUse(false)
  }

  shouldComponentUpdate() {
    return !uiStore.isFeedbakInUse
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
