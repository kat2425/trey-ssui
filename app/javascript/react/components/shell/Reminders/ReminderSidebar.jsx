import React, { Component }     from 'react'
import { observer }             from 'mobx-react'
import Header                   from './Header'
import ScrollView               from './ScrollView'
import Wrapper                  from './Wrapper'
import LoadingSpinner           from 'ui/shell/LoadingSpinner'
import _                        from 'lodash'
import { 
  ButtonDropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, ListGroup 
} from 'reactstrap'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import ReminderItem             from './ReminderItem'
import ReminderForm             from './ReminderForm'

@observer
export default class ReminderSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      filter:       'Pending',
      justFiltered: false
    }
  }

  handleCheck = (id) => {
    const { completeReminder } = this.props.store

    completeReminder(id)
  }

  handleUndo = (id) => {
    const { undoReminder } = this.props.store

    undoReminder(id)
  }

  handleRemove = (id) => {
    const { removeReminder } = this.props.store

    removeReminder(id)
  }

  handleFilter = (e) => {
    const filter = e.currentTarget.textContent

    // this.state.justFiltered prevents transition from firing
    // on filter change

    this.setState({ justFiltered: true }, () => {
      const { setSelectedFilter } = this.props.store

      setSelectedFilter(filter.toLowerCase())
      this.setState({ filter: filter }, () => {
        this.setState({ justFiltered: false })
      })
    })
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  renderDropdown = () => {
    return (
      <ButtonDropdown style={{ margin: 5 }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.filter}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick = {this.handleFilter}>Pending</DropdownItem>
          <DropdownItem onClick = {this.handleFilter}>Complete</DropdownItem>
          <DropdownItem onClick = {this.handleFilter}>All</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    )
  }

  renderEmpty = () => {
    const {
      isLoading,
      isEmpty
    } = this.props.store

    return (
      isLoading 
        ? <div className='text-center'><LoadingSpinner /></div> 
        : isEmpty  
          ? ( 
            <div className='text-center'>
              <p style={{ padding: 5, color: 'darkgray' }}>No reminders to see here.</p>
            </div> 
          )
          : null
    )
  }

  render() {
    const {
      filteredReminders
    } = this.props.store

    if (!this.props.show) return null
    return (
      <Wrapper show={this.props.show}>
        <Header title='Reminders' onClose={this.props.onClose} />
        {this.renderDropdown()}
        <ScrollView style={{ height: 'calc( 100% - 285px)' }}>
          <ListGroup>
            <ReactCSSTransitionGroup
              transitionName         = 'reminder-item'
              transitionEnter        = {this.state.justFiltered ? false: true}
              transitionLeave        = {this.state.justFiltered ? false: true}
              transitionEnterTimeout = {500}
              transitionLeaveTimeout = {300}
            >
              {!_.isEmpty(filteredReminders) && filteredReminders.map((reminder) => {
                return (
                  <ReminderItem
                    key          = {reminder.id}
                    reminder     = {reminder}
                    handleCheck  = {this.handleCheck}
                    handleUndo   = {this.handleUndo}
                    handleRemove = {this.handleRemove}
                  />
                )
              })}
              {this.renderEmpty()}  
            </ReactCSSTransitionGroup>
          </ListGroup>
        </ScrollView>
        <ReminderForm reminderStore={this.props.store} />
      </Wrapper>
    )
  }
}
