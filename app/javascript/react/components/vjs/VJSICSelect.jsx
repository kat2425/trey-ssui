import React, { Component} from 'react'
import PropTypes           from 'prop-types'

import Select              from 'react-virtualized-select'
import LoadingSpinner      from 'ui/shell/LoadingSpinner'
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
      resourceLoaded: false,
      options:        null
    }
  }

  componentDidMount() {
    const { inputPath, params } = this.props

    this._isMounted = true
    this.renderOptions(inputPath, params)
  }

  componentWillReceiveProps(nextProps) {
    const { inputPath, params } = nextProps

    if (!(this.props.params == params)) {
      this.setState({ resourceLoaded: false })
      this.renderOptions(inputPath, params)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  renderOptions(path, params) {
    this.control = window.vjsClient.inputControls({
      resource: path,
      params:   (params || {}),
      success:  (ic) => {
        if (this._isMounted) {
          const filter = _.find(ic, { id: this.props.id })

          if (filter) {
            this.setState({
              resourceLoaded: true,
              options:        filter.state.options
            })
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
          isLoading      = {!this.state.resourceLoaded}
          placeholder    = {this.props.placeholder}
          options        = {this.state.options}
          value          = {this.props.selectedValue}
          onChange       = {this.props.handleChange}
          maxHeight      = {375}
          optionRenderer = {this.props.optionRenderer || null}
        />
      </div>
    )
  }
}
