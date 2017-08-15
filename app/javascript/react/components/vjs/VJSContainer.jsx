import React     from 'react'
import PropTypes from 'prop-types'

export default class VJSContainer extends React.Component {
  constructor(props) {
    super(props)

    this.vjsClient = null
    this.state     = { clientLoaded: false }
  }

  componentDidMount() {
    this.setVJSClient()
  }

  getChildContext() {
    return { vjsClient: this.vjsClient }
  }

  setVJSClient() {
    window.visualize.config({
      auth: {
        name:         window.SSUser.id,
        password:     window.SSUser.jasper.token,
        organization: window.SSUser.jasper.org,
      }
    })

    window.visualize((vjs) => {
      this.vjsClient = vjs
      this.setClientState(true)
    })
  }

  setClientState(bool) {
    this.setState({
      clientLoaded: bool
    })
  }

  renderChildren() {
    return (
      <div className='vjs-container'>
        {this.props.children}
      </div>
    )
  }

  render() {
    if (this.state.clientLoaded) {
      // VisualizeJS client is loaded, we're clear to render child components containing
      // embedded reports
      return this.renderChildren()
    } else {
      // VisualizeJS client has to initlalized, we'll pull from the `window.visualize'
      // global, setting out jasper token and organization id to gain an entry point via
      // local client which we then inject into children via context
      // this.setVJSClient()
      return null
    }
  }
}

// Share container client with children via context
VJSContainer.childContextTypes = {
  vjsClient: PropTypes.func
}
