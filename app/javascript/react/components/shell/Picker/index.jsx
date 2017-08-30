import React, {Component}           from 'react'
import { FormGroup, Label, Input }  from 'reactstrap'
import Select                       from 'react-select'
import _                            from 'lodash'
import GroupPicker                  from '../GroupPicker'

export default class Picker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selections: [],
      visible: false
    }
  }

  handleChange = (val) => {
    const { id } = val
    const selectedItems = []
    selectedItems.push(val)
    console.log(val)
    this.setState({ selections: val })
  }

  render() {    
    return (
      <div>
        <Select
          placeholder={this.props.placeholder ? this.props.placeholder : 'Select...'}
          name="form-field-name"
          value={this.state.selections}
          multi={this.props.multi ? true : false}
          options={this.props.options}
          onChange={this.handleChange}
          labelKey={this.props.labelKey}
        />
        {this.state.visible && this.renderGroups()}
      </div>
    )
  }
}