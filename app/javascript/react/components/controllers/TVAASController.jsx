import React, { Component} from 'react'
import PropTypes from 'prop-types'

import TVAAS from '../../modules/logic/TVAAS'
import SMSConversationStore from '../../stores/SMSConversation'

export default class TVAASController extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TVAAS store={SMSConversationStore}/>
    )
  }
}
