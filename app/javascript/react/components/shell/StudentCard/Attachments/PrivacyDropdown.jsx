import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import uuid               from 'uuid'
import {
  Dropdown, 
  DropdownMenu, 
  DropdownItem, 
  DropdownToggle,
  Button
} from 'reactstrap'

export default class PrivacyDropdown extends Component {
  static propTypes = {
    options:  PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func,
    labelKey: PropTypes.string.isRequired,
    valueKey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      privacyIcon:  null
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  componentDidMount() {
    this.setIcon(this.props) 
  }

  componentWillReceiveProps(nextProps) {
    this.setIcon(nextProps) 
  }

  handleSelect = (option) => () => {
    this.props.onSelect(option[this.props.valueKey])
    this.setState({ dropdownOpen: false })
  }

  setIcon = (props) => {
    const { visibility } = props

    switch(visibility) {
    case 'public':
      this.setState({ privacyIcon: 'icon-eye text-muted'})
      break
    case 'private':
      this.setState({ privacyIcon: 'icon-lock'}) 
      break
    case 'groups':
      this.setState({ privacyIcon: 'icon-users'}) 
      break
    default:
      this.setState({ privacyIcon: 'icon-lock'})
      break 
    }     
  }

  renderItem = (option) => (
    <span key={uuid()} onClick={this.handleSelect(option)}>
      <DropdownItem 
        active = {option[this.props.valueKey] === this.props.visibility} 
        key    = {option.id}
      >
        {option[this.props.labelKey]}
      </DropdownItem>
    </span>
  )

  render() {
    if(!this.props.options) return null
    return (
      <div className='d-inline-block'> 
        <Button
          hidden    = {this.props.hidden}
          onClick   = {this.toggleDropdown}
          size      = 'sm'
          className = 'ml-1'
          style     = {{height: 28}}
          title     = 'Private'
          disabled  = {!this.props.isModifiable}
        >
          <span 
            className={`icon ${this.state.privacyIcon}`} 
            style={ this.props.visibility === 'private' ? {color: '#ca5b54'} : null}
          />
        </Button>
        <Dropdown 
          direction='left' 
          toggle={() => null} 
          isOpen={this.state.dropdownOpen}
          style={{height: 0, width: 0}} /* react 16 fix */
        >

          {/*Added below code for this dropdown to work*/}
          <DropdownToggle className='invisible'>Click</DropdownToggle>

          <DropdownMenu right>
            {this.props.options.map(this.renderItem)}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
