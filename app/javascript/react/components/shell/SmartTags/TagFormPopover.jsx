import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { Popover }          from 'antd'
import { observer }         from 'mobx-react'

import TagForm              from './TagForm'

@observer
export default class TagFormPopover extends Component {
  static propTypes = {
    title:     PropTypes.string,
    trigger:   PropTypes.oneOf(['hover', 'focus', 'click']),
    placement: PropTypes.string,
    tag:       PropTypes.object.isRequired,
    children:  PropTypes.node.isRequired
  }

  static defaultProps = {
    trigger:   'click',
    placement: 'bottom'
  }

  state = {
    visible: false,
  }

  hide = () => {
    this.props.tag.clearErrors()
    this.setState({
      visible: false,
    })
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }

  render() {
    return (
      <Popover
        content         = {<TagForm tag={this.props.tag} onCancel={this.hide} />}
        title           = {this.props.title}
        trigger         = {this.props.trigger}
        placement       = {this.props.placement}
        visible         = {this.state.visible}
        onVisibleChange = {this.handleVisibleChange}
      >
        {this.props.children}
      </Popover>
    )
  }
}
