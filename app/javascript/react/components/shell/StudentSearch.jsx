import React, { Component } from 'react'
import { AsyncTypeahead }   from 'react-bootstrap-typeahead'

import StudentAvatar        from './StudentAvatar'

import xhr                  from '../../helpers/XHR'
import fireEvent            from '../../helpers/FireEvent'
import _                    from 'lodash'

// import 'react-bootstrap-typeahead/css/Typeahead.css'

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

  // Custom menu item for search results
  return (
    <div key={ student.id } className='row pr-2 pl-2 mb-1'>
      <div className='col-xs-3'>
        <StudentAvatar id={ student.id } size={30} />
      </div>

      <div className='col-sm-9 ml-1'>
        <span dangerouslySetInnerHTML={{__html: formatResults(search, `${ student.last_name }, ${ student.first_name }`)}}></span>
        <br/>
        <small>{ student.school.school_name }</small>
        <br/>
        <small>{ student.state_id }</small>
      </div>
    </div>
  )
}

export default class StudentSearch extends Component {
  constructor(props) {
    super(props)

    this.lookupStudent = _.debounce(this._lookupStudent, 300, {
      leading:  false,
      trailing: true
    })

    this.state = {
      value:    '',
      students: []
    }
  }

  // TODO: we might not need a store for this component, but AJAX actions should at
  // least be moved into a top-level controller
  _lookupStudent(val) {
    if (val.length >= 3) {
      xhr.get('/students', {
        params: {
          only:        'id,state_id,grade,first_name,last_name,school.school_name',
          limit:       20,
          text_filter: val
        }
      }).then((res) => {
        this.setState({ students: res.data })
      })
    }
  }

  // NOTE: we do this because we're guarenteed to only get good results back from
  // the server, so any filtering we do here messes up those result.
  filterByCallback(option, text) {
    return true
  }

  renderResults(student, props, index) {
    return <StudentSearchItem student={student} search={props.text}/>
  }

  selectStudent(e) {
    if (e.length) {
      fireEvent('showStudentCard', { student: e[0].id })
    }
  }

  render() {
    return (
      <div style={{width:'300px'}} className='student-search-container'>
        <AsyncTypeahead
          labelKey               = {student => `${ student.last_name }, ${ student.first_name }`}
          multiple               = {false}
          clearButton            = {true}
          maxHeight              = {435}
          filterBy               = {::this.filterByCallback}
          options                = {this.state.students}
          onSearch               = {::this.lookupStudent}
          onChange               = {::this.selectStudent}
          renderMenuItemChildren = {::this.renderResults}
          placeholder            = 'Find a student...'
        />
      </div>
    )
  }
}
