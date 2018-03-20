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

  static defaultProps = {
    multi:      false,
    setDefault: false,
    width:      100
  }

  constructor(props) {
    super(props)

    this._isMounted     = false
    this._setDefaultOpt = true
    this._selectedValue = undefined
    this.control        = null
    this.state          = {
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

  // FIXME: Attempt to dynamically set menu item height.  This works fairly well, but we
  // can definitely come up with something more accuruate down the road
  getItemHeight(option) {
    const { label }   = option
    const { width }   = this.props
    const labelLength = (10 * label.replace(/ |,|i|l/g, '').length)

    if (labelLength > width) {
      return (30 * (Math.ceil(labelLength / width)))
    } else {
      return 35
    }
  }

  renderOptions(path, params) {
    this.control = window.vjsClient.inputControls({
      resource: path,
      params:   (params || {}),
      success:  (ic) => {
        if (this._isMounted) {
          const filter  = _.find(ic, { id: this.props.id })
          const options = filter.state.options

          if (this._setDefaultOpt && this.props.setDefault) {
            if (!!options.length) {
              options[0].selected = true
            }
          }

          if (filter) {
            this.setState({
              resourceLoaded: true,
              options:        options
            })

            if (this._setDefaultOpt && this.props.setDefault) {
              this.props.handleChange(options[0])
              this._setDefaultOpt = false
            }
          }
        }
      }
    })
  }

  render() {
    return (
      <div style={{width: this.props.width}} className='ml-2'>

        <Select
          name           = {this.props.id}
          isLoading      = {!this.state.resourceLoaded}
          placeholder    = {this.props.placeholder}
          options        = {this.state.options}
          value          = {this.props.selectedValue}
          onChange       = {this.props.handleChange}
          maxHeight      = {375}
          optionHeight   = {({ option }) => this.getItemHeight(option)}
          clearable      = {this.props.clearable}
          mutli          = {this.props.multi}
          optionRenderer = {this.props.optionRenderer || null}
        />
      </div>
    )
  }
}
