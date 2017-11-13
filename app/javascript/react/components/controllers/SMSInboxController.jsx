import React, { Component} from 'react'
import PropTypes           from 'prop-types'
import { observer, inject }         from 'mobx-react'

import SMSInboxStore       from 'stores/SMSInbox'
import Inbox from 'ui/shell/SMS/Inbox'

import fireEvent from 'helpers/FireEvent'

const inboxStyle = {
  backgroundColor: 'white',
  width:           '100%',
  height:          '100%',
  position:        'relative',
  overflow:        'auto'
}

const headerStyle = secondary => ({
  position:        'absolute',
  width:           '100%',
  height:          '65px',
  backgroundColor: 'rgb(245,245,245)',
  borderBottom:    '1px solid rgba(0,0,0,0.125)',
  top:             57
})

const listStyle = secondary => ({
  position: 'absolute',
  width:    '100%',
  top:      122,
  bottom:   '50px',
  overflow: 'auto'
})

@inject('uiStore')
@observer
export default class SMSInboxController extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    SMSInboxStore.fetchInbox()
  }

  hideSidebar = () => {
    fireEvent('toggleSidebar')
  }

  render() {
    const {uiStore} = this.props
    const isSecondary = uiStore.sidebarMaxHeight ? true : false

    return (
      <div style={inboxStyle}>
        <div className='p-0 pl-4 pr-3' style={headerStyle(isSecondary)}>
          <h4 className='m-0' style={{lineHeight:'22px',top:'18px',position:'absolute'}}>
            <span className='icon icon-chat text-muted mr-4'/>
            Messages
          </h4>

          <div className='float-right' style={{lineHeight:'22px',top:'21px',position:'relative',fontSize:18}}>
            <span
              className = 'icon icon-cross text-muted'
              style     = {{lineHeight:'22px'}}
              onClick   = {this.hideSidebar}
            />
          </div>
        </div>

        <div style={listStyle(isSecondary)}>
          <Inbox handleSelect={this.props.handleSelect} messages={this.props.store.inbox}/>
        </div>
      </div>
    )
  }
}
