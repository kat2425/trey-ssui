import React, { Component } from 'react'
import { AsyncTypeahead }   from 'react-bootstrap-typeahead'

import StudentAvatar        from './StudentAvatar'

import xhr                  from '../../helpers/XHR'
import fireEvent            from '../../helpers/FireEvent'
import _                    from 'lodash'

// import 'react-bootstrap-typeahead/css/Typeahead.css'

const StudentSearchItem = ({ student, search }) => {
  // Format results and highlight matched search string in menu list
  const formatResults = (search, value) => {
    const regex = RegExp(`(${search})`, 'i')

    return  _.flattenDeep(value.split(regex).map((str, i) => {
      if (!!str.match(regex)) {
        return [ <strong key={ i } className='typeahead-highlight'>{ str }</strong> ]
      } else {
        return str
      }
    }))
  }

  // Custom menu item for search results
  return (
    <div key={ student.id } className='row pr-2 pl-2 mb-1'>
      <div className='col-xs-3'>
        <StudentAvatar id={ student.id } size={30} />
      </div>

      <div className='col-sm-9 ml-1'>
        {formatResults(search, `${ student.last_name }, ${ student.first_name }`)}
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
          filterBy               = {['first_name', 'last_name', 'state_id']}
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
