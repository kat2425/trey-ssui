import React, { Component}  from 'react'
import { observer }         from 'mobx-react'

import TVAAS                from '../../modules/logic/TVAAS'
import smsConversationStore from '../../stores/SMSConversationStore'

@observer
export default class TVAASController extends Component {
  render() {
    return (
      <TVAAS store={smsConversationStore}/>
    )
  }
}
