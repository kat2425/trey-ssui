import React, {Component}      from 'react'
import _                       from 'lodash'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoadingSpinner          from 'ui/shell/LoadingSpinner'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true
    }
  }

  renderTitle() {
    if (!this.props.loading && this.props.notificationTitle) {
      return (
        <h4 className='alert-heading'>{ this.props.notificationTitle }</h4>
      )
    }
  }

  renderBody() {
    if (!this.props.loading) {
      return (
        <p>{ this.props.notificationText }</p>
      )
    } else {
      if (this.props.loadingText) {
        return (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <LoadingSpinner className='growl-alert' />
            { this.props.loadingText }
          </div>
        )
      } else {
        return (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <LoadingSpinner className='growl-alert' />
          </div>
        )
      }
    }
  }

  renderDismissButton() {
    if (this.props.dismissable != false && !this.props.loading) {
      return (
      <button
        onClick      = {() =>
          _.isFunction(this.props.onDismissed) 
            ? this.props.onDismissed() 
            : this.setState({visible: false})
        }
        type         = 'button'
        className    = 'close'
        data-dismiss = 'alert'
        aria-label   = 'Close'
        style        = {{
          cursor:   'pointer',
          padding:  '1px 5px 0px 0px',
          position: 'absolute',
          right:    0,
          top:      0,
        }}
      >
        <span style={{color: 'dimgray'}} aria-hidden='true'>×</span>
      </button>
      )
    }
  }

  render() {
    const defaultStyle = {
      position: 'fixed',
      right:    10,
      top:      25,
      zIndex:   999999
    }

    const isVisible = (this.state.visible && this.props.visible) 
      || (this.state.visible && this.props.visible == null)
    
    return (
      <ReactCSSTransitionGroup
        transitionName         = 'alert'
        transitionEnterTimeout = {1000}
        transitionLeaveTimeout = {1000}
      >
        { isVisible
          ? (<div style={{...defaultStyle, ...this.props.style}} className='growl growl-static'>
            <div 
              style     = {{display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className = {'alert alert-dismissable ' + (this.props.type || 'alert-info')}
              role      = 'alert'
            >
              { this.renderDismissButton() }
              <div style={{width: '100%'}}>
                { this.renderTitle() }
                { this.renderBody()  }
              </div>
            </div>
          </div>)
          : null
        }
      </ReactCSSTransitionGroup>
    )
  }
}
