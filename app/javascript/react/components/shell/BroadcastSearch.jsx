import React                from 'react'
import { observer }         from 'mobx-react'
import { AsyncTypeahead }   from 'react-bootstrap-typeahead'
import styled               from 'styled-components'

const BroadcastSearch = ({broadcastDraft, onChange, type}) => (
  <div>
    <SAsyncTypeahead
      dropup
      isLoading              = {broadcastDraft.isSearching}
      labelKey               = {recipient => `${getName(recipient)} (${getType(recipient)})`}
      multiple               = {true}
      options                = {broadcastDraft.options.slice()}
      onSearch               = {(q) => broadcastDraft.searchRecipients(q, type)}
      onChange               = {onChange}
      renderMenuItemChildren = {getName}
      placeholder            = {`Find a ${type}`}
      minLength              = {3}
    />
  </div>
)

const SAsyncTypeahead = styled(AsyncTypeahead)`
  & .rbt-input-wrapper{
    display: flex;
    flex-flow: column nowrap;
  }
`

const getName = ( recipient ) => {
  return recipient.name || recipient.group_name || recipient.course_name
}

const getType = ( recipient ) => {
  if(recipient.name) return 'contact'
  if(recipient.group_name) return 'group'
  if(recipient.course_name) return 'course'
}

export default observer(BroadcastSearch)
