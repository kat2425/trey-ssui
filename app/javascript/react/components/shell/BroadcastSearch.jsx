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
    const contact = `${recipient.name || recipient.relationship}`
    const firstName = recipient.student.first_name
    const lastName = recipient.student.last_name
    const student = `${firstName} ${lastName}`
    const relation = `${recipient.relationship || 'Contact'}`

    return `${contact} (${student}'s ${relation})`
  }
  if(recipient.course_name) {
    const period = recipient.class_period ? `Period ${recipient.class_period}` : ''
    const term   = recipient.term ? ` - ${recipient.term}` : ''

    return `${recipient.course_name} ${period} ${term}`
  }
  return recipient.group_name
}

const getType = ( recipient ) => {
  if(recipient.name) return ''
  if(recipient.group_name) return '(group)'
  if(recipient.course_name) return '(course)'
}

export default observer(BroadcastSearch)
