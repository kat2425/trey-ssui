import React, {Component}   from 'react'
import Select               from 'react-select'
import xhr                  from 'helpers/XHR'
import { observer }         from 'mobx-react'

@observer
export default class MemberSearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data:  null,
      value: null
    }
  }

  onChange = (value) => {
    this.setState({ value })
  }

  handleSelect = (value) => {
    this.props.group.addMembers(value)
  }

  fetchResults = (value) => {
    if(this.props.group.groupType === 'user') {
      return this.searchUsers(value)
    } else if(this.props.group.groupType === 'student') {
      return this.searchStudents(value)
    }
  }

  searchStudents = async(value) => {
    const params = { text_filter: value }

    const {data} = await xhr.get('typeahead/students', {params})
    
    return {options: data}
  }

  searchUsers = async(value) => {
    const params = {
      query: value,
      limit: 10,
      only:  [
        'id',
        'username',
        'full_name',
        'first_name',
        'last_name'
      ].join(',')
    }
    const {data} = await xhr.get('/users/es_search', {params})

    return {options: data}
  }

  renderSearchItem = (d) => {  
    console.log(d)  
    return (
      <p>{`${d.first_name} ${d.last_name}`}</p>
    )
  }

  render() {
    if(!this.props.group.groupType) return null

    return (
      <Select.Async
        disabled         = {!this.props.group.groupType}
        cache            = {false}
        placeholder      = 'Add members...'
        multi
        filterOptions    = {false}
        className        = 'mt-4'
        onChange         = {this.handleSelect}
        value            = {this.state.value} 
        onInputChange    = {this.onChange} 
        valueKey         = 'id'
        optionRenderer   = {this.renderSearchItem}
        labelKey         = {'first_name'}
        loadOptions      = {this.fetchResults} 
      />
    )
  }
}
