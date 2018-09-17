import React, { Component } from 'react'
import { AsyncTypeahead }   from 'react-bootstrap-typeahead'

import StudentAvatar        from './StudentAvatar'
import { inject, observer } from 'mobx-react'
import _                    from 'lodash'

const StudentSearchItem = ({ student, search }) => {
  const formatResults = (search, value) => {
    const regexs   = _.forEach(search.split(' '), (v) => RegExp(`(${v})`, 'ig'))
    let   newValue = value

    _.each(regexs, (regex) => {
      _.each(value.match(regex), (m) => {
        newValue = newValue.replace(m, '<strong class="typeahead-highlight">' + m + '</strong>')
      })
    })

    return newValue
  }

  return (
    <div key={ student.id } className='row pr-2 pl-2 mb-1'>
      <div className='col-xs-3'>
        <StudentAvatar id={ student.id } size={30} />
      </div>

      <div className='col-sm-9 ml-1'>
        <span
          dangerouslySetInnerHTML={{__html: formatResults(
            search, `${ student.last_name }, ${ student.first_name }`
          )}}
        >
        </span>
        <br/>
        <small>{ student.school_name }</small>
        <br/>
        <small>{ renderGrade(student.grade) }{ student.state_id }</small>
      </div>
    </div>
  )
}

const renderGrade = (grade) => {
  if (grade !== 'HE') {
    return `Grade ${grade}, `
  }
}

@inject('reminderStore')
@observer
export default class StudentSearch extends Component {
  constructor(props) {
    super(props)
    
    const { reminderStore } = this.props

    this.lookupStudent = _.debounce(reminderStore.lookupStudent, 300, {
      leading:  false,
      trailing: true
    })
  } 

  // NOTE: we do this because we're guarenteed to only get good results back from
  // the server, so any filtering we do here messes up those result.
  filterByCallback() {
    return true
  }

  renderResults(student, props) {
    return <StudentSearchItem student={student} search={props.text}/>
  }

  render() {
    const { style, reminderStore } = this.props

    return (
      <div style={style} className='student-search-container'>
        <AsyncTypeahead
          isLoading              = {reminderStore.isTypeAheadLoading}
          dropup                 = {this.props.dropup}
          labelKey               = {student => `${ student.last_name }, ${ student.first_name }`}
          multiple               = {false}
          clearButton            = {true}
          maxHeight              = '435px'
          filterBy               = {::this.filterByCallback}
          options                = {reminderStore.students.slice()}
          onSearch               = {this.lookupStudent}
          onChange               = {this.props.onChange}
          onKeyDown              = {(e) => {
            if(reminderStore.hasSelectedStudent) {
              //only allow backspace, delete, home, end, and arrow keys
              if (e.keyCode !== 8 && 
                e.keyCode !== 46 &&
                !(e.keyCode > 34 && e.keyCode < 41)) {
                e.preventDefault()
              }
            }
          }}
          renderMenuItemChildren = {::this.renderResults}
          placeholder            = 'Find a student...'
          minLength              = {3}
        />
      </div>
    )
  }
}
