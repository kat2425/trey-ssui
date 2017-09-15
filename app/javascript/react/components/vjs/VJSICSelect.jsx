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

    this._isMounted = false
    this.control    = null
    this.state      = {
      options: null
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.renderOptions()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  renderOptions() {
    this.control = window.vjsClient.inputControls({
      resource: this.props.inputPath,
      params:   (this.props.params || {}),
      success:  (ic) => {
        if (this._isMounted) {
          const filter = _.find(ic, { id: this.props.id })

          if (filter) {
            this.setState({ options: filter.state.options })
          }
        }
      }
    })
  }

  render() {
    return (
      <div style={{width: (this.props.width || 100)}} className='ml-2'>
        <Select
          name           = {this.props.id}
          placeholder    = {this.props.placeholder}
          options        = {this.state.options}
          value          = {this.props.selectedValue}
          onChange       = {this.props.handleChange}
          optionRenderer = {this.props.optionRenderer || null}
        />
      </div>
    )
  }
}
