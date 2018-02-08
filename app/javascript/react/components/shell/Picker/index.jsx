import React, { Component } from 'react'
import { toJS }             from 'mobx'
import { observer }         from 'mobx-react'
import Select               from 'react-select'

@observer
export default class Picker extends Component {
  render() {    
    return (
      <div>
        <Select
          labelKey    = {this.props.labelKey}
          multi       = {this.props.multi ? true : false}
          onChange    = {this.props.handleChange}
          options     = {toJS(this.props.options)}
          placeholder = {this.props.placeholder ? this.props.placeholder : 'Select...'}
          value       = {toJS(this.props.selectedValues)}
          valueKey    = {this.props.valueKey}
        />
      </div>
    )
  }
}
