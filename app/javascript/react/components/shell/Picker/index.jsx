import React, { Component } from 'react'
import { observer }         from 'mobx-react'
import Select               from 'react-select'

@observer
export default class Picker extends Component {
  constructor(props) {
    super(props)
  }

  render() {    
    return (
      <div>
        <Select
          labelKey={this.props.labelKey}
          multi={this.props.multi ? true : false}
          onChange={this.props.handleChange}
          options={this.props.options.toJS()}
          placeholder={this.props.placeholder ? this.props.placeholder : 'Select...'}
          value={this.props.selectedValues.toJS()}
          valueKey={this.props.valueKey}
        />
      </div>
    )
  }
}
