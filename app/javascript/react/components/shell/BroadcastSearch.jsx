import React                from 'react'
import { observer }         from 'mobx-react'
import { AsyncTypeahead }   from 'react-bootstrap-typeahead'
import styled               from 'styled-components'

const BroadcastSearch = ({broadcastDraft, onChange, type}) => (
  <div>
    <SAsyncTypeahead
      dropup
      isLoading              = {broadcastDraft.isSearching}
      labelKey               = {recipient => `${getName(recipient)} ${getType(recipient)}`}
      multiple               = {true}
      options                = {broadcastDraft.options.slice()}
      onSearch               = {(q) => broadcastDraft.updateQueryAndSearch(q)}
      onChange               = {onChange}
      renderMenuItemChildren = {getName}
      placeholder            = {`Find a ${type}`}
      minLength              = {3}
      useCache               = {false}
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
  if(recipient.name){
    const Contact = `${recipient.name || recipient.relationship}`
    const FirstName = recipient.student.first_name
    const LastName = recipient.student.last_name
    const Student = `${FirstName} ${LastName}`
    const Relation = `${recipient.relationship || 'Contact'}`

    return `${Contact} (${Student}'s ${Relation})`
  }
  return recipient.group_name || recipient.course_name
}

const getType = ( recipient ) => {
  if(recipient.name) return ''
  if(recipient.group_name) return '(group)'
  if(recipient.course_name) return '(course)'
}

export default observer(BroadcastSearch)
