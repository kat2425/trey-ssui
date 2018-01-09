import React, { Component }    from 'react'
import PropTypes               from 'prop-types'
import { observer }            from 'mobx-react'
import Dialpad                 from 'ui/shell/ActionBar/Calling/Dialpad'
import CallDialog              from 'ui/shell/ActionBar/Calling/CallDialog'

@observer
export default class CallingController extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    return (
      <div style={{ zIndex: 9999 }}>
        <Dialpad callingStore={this.props.store} />
        <CallDialog callingStore = {this.props.store} />
      </div>
    )
  }
}