import React, { Component }   from 'react'
import { observer }           from 'mobx-react'
import SSButton               from 'ui/shell/SSButton'
import styled                 from 'styled-components'
import parentStore, { MODAL } from 'stores/ParentAccessManagementStore'
import { AsyncTypeahead }     from 'react-bootstrap-typeahead'
import { isEmpty }            from 'lodash/fp'

@observer
class TopBar extends Component {
  handleEmpty = (filter) => {
    const { store } = this.props

    if (isEmpty(filter)) {
      store.setFilter('')
      store.fetchParentValidations()
    }
  }

  filterByCallback = () => {
    return true
  }

  lookupContact = (filter) => {
    this.props.store.handleContactSearch(filter)
  }

  onInviteParent = () => {
    parentStore.setShowModal(MODAL.INVITE)
  }

  render() {
    const { store } = this.props

    return (
      <div className='mb-4 d-flex justify-content-between align-items-center'>
        <SAsyncTypeahead
          isLoading              = {false}
          labelKey               = {contact => contact.name}
          filterBy               = {this.filterByCallback}
          options                = {[]}
          onSearch               = {this.lookupContact}
          onInputChange          = {this.handleEmpty}
          placeholder            = 'Find a parent...'
          renderMenu             = {() => null}
        />
        <div>
          <SSButton
            iconClass = 'icon icon-plus'
            className = 'mr-4'
            color     = 'primary'
            onClick   = {this.onInviteParent}
          >
            Invite Parent
          </SSButton>
          <SSButton
            iconClass = 'icon icon-cw'
            disabled  = {store.isLoading}
            onClick   = {store.fetchParentValidations}
          >
            Reload
          </SSButton>
        </div>
      </div>
    )
  }
}

const SAsyncTypeahead = styled(AsyncTypeahead)`
  width: 37.5%;
`

export default TopBar
