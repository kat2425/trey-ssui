import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import Select              from 'react-virtualized-select'
import createFilterOptions from 'react-select-fast-filter-options'
import _                   from 'lodash'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

export default class VJSICSelect extends Component {
  static propTypes = {
    children:  PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.control = null
    this.state   = {
      options: null
    }
  }

  componentDidMount() {
    this.renderOptions()
  }

  renderOptions() {
    this.control = this.context.vjsClient.inputControls({
      resource: this.props.inputPath,
      success:  (ic) => {
        const filter = _.find(ic, { id: this.props.id })

        if (filter) {
          this.setState({ options: filter.state.options })
        }
      }
    })
  }

  render() {
    return (
      <div style={{width: (this.props.width || 100)}}>
        <Select
          name          = {this.props.id}
          placeholder   = {this.props.placeholder}
          options       = {this.state.options}
          value         = {this.props.selectedValue}
          onChange      = {this.props.handleChange}
        />
      </div>
    )
  }
}

VJSICSelect.contextTypes = {
  vjsClient: PropTypes.func
}
