import React, {Component}       from 'react'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import LoadingSpinner           from 'ui/shell/LoadingSpinner'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true
    }
  }

  render() {
    const isVisible = (this.state.visible && this.props.visible) 
      || (this.state.visible && this.props.visible == null)
    
    return (
      <ReactCSSTransitionGroup
        transitionName         = 'alert'
        transitionEnterTimeout = {1000}
        transitionLeaveTimeout = {1000}
      >
        { isVisible
          ? (<div style={this.props.style} className='growl growl-static'>
            <div 
              style     = {{display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className = 'alert alert-info alert-dismissable' 
              role      = 'alert'
            >
              { (this.props.dismissable != false && !this.props.loading) &&
                <button 
                  onClick      = {() => this.setState({visible: false})} 
                  type         = 'button' 
                  className    = 'close' 
                  data-dismiss = 'alert' 
                  aria-label   = 'Close'
                  style        = {{position: 'absolute', padding: '1px 5px 0px 0px', top: 0, right: 0}}
                >
                  <span style={{color: 'dimgray'}} aria-hidden='true'>×</span>
                </button>
              }
              { !this.props.loading 
                ? this.props.notificationText 
                : ( this.props.loadingText 
                  ? <div style                = {{display: 'flex', alignItems: 'center'}}> 
                    <LoadingSpinner className = 'growl-alert' />
                    {this.props.loadingText}
                  </div>
                  : <LoadingSpinner className = 'growl-alert' />
                )
              }
            </div>
          </div>)
          : null
        }
      </ReactCSSTransitionGroup>
    )
  }
}
