// FIXME
// Make stateless

import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer }        from 'mobx-react'

import LoadingSpinner      from 'ui/shell/LoadingSpinner'
import Conversation        from './Conversation'

@observer
export default class SMS extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  setRead = (id) => {
    this.props.store.setRead(id)
  }

  renderConversation({isLoading, descMessages}) {
    return do {
      if (isLoading) {
        <div className='text-center'>
          <LoadingSpinner/>
        </div>
      } else {
        <div className='p-3 pb-5'>
          <Conversation messages={descMessages} setRead={this.setRead} />
        </div>
      }
    }
  }

  render() {
    return (
      <div>
        { this.renderConversation(this.props.store) }
      </div>
    )
  }
}
