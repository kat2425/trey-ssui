import React             from 'react'
import _                 from 'lodash'
import { bugsnagClient } from 'helpers/bugsnag'

export default class VJSContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { clientLoaded: false }
  }

  componentDidMount() {
    if(_.hasIn(window, 'visualize')) {
      this.setVJSClient()
    } else {
      bugsnagClient.notify(new Error('Visualize JS BROKE'))
    }
  }

  setVJSClient() {
    window.visualize.config({
      server: 'https://jasper.schoolstatus.com/jasperserver-pro',
      auth:   {
        name:         window.SSUser.id,
        password:     window.SSUser.jasper.token,
        organization: window.SSUser.jasper.org,
        /*
         * name:         'adf387de-51f6-4b57-9250-1b4b9b120b59' || window.SSUser.id,
         * password:     'fa7f22fb1159197e890a360467543d69' || window.SSUser.jasper.token,
         * organization: '5126918ae9c77f9384000053' || window.SSUser.jasper.org,
         */
      }
    })

    window.visualize((vjs) => {
      if (!window.vjsClient) {
        window.vjsClient = vjs
      }

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
      <div className={`vjs-container ${this.props.className}`}>
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
