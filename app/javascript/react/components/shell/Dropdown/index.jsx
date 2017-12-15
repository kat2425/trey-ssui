import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import uuid               from 'uuid'

import {
  ButtonDropdown, DropdownToggle, 
  DropdownMenu, DropdownItem
} from 'reactstrap'

export default class Dropdown extends Component {
  static propTypes = {
    dropdownLabel: PropTypes.string.isRequired,
    options:       PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect:      PropTypes.func,
    labelKey:      PropTypes.string.isRequired,
    valueKey:      PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle outline color="primary" caret>
          {this.props.dropdownLabel}
        </DropdownToggle>
        <DropdownMenu>
          { this.props.options &&
            this.props.options.map((option) => {
              return (
                <span key={uuid()} onClick={() => this.props.onSelect(option[this.props.valueKey])}>
                  <DropdownItem key={option.id}>{option[this.props.labelKey]}</DropdownItem>
                </span>
              )
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}
