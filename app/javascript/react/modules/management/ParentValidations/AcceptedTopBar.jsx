import React, { Component }   from 'react'
import { observer }           from 'mobx-react'
import SSButton               from 'ui/shell/SSButton'
import styled                 from 'styled-components'
import { AsyncTypeahead }     from 'react-bootstrap-typeahead'
import { isEmpty }            from 'lodash/fp'

@observer
class AcceptedTopBar extends Component {
  handleEmpty = (filter) => {
    const { store } = this.props

    if (isEmpty(filter)) {
      store.setFilter('')
      store.clearData()
      store.fetchParentUsers()
    }
  }

  filterByCallback = () => {
    return true
  }

  lookupContact = (filter) => {
    this.props.store.handleContactSearch(filter)
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
        <SSButton
          iconClass = 'icon icon-cw'
          disabled  = {store.isLoading}
          onClick   = {store.fetchParentUsers}
        >
          Reload
        </SSButton>
      </div>
    )
  }
}

const SAsyncTypeahead = styled(AsyncTypeahead)`
  width: 37.5%;
`

export default AcceptedTopBar
