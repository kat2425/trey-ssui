import React, { Component } from 'react'
import { Row, Col }         from 'reactstrap'
import { observer }         from 'mobx-react'

import ModuleHeader         from 'ui/shell/ModuleHeader'
import QueryBuilder         from 'ui/shell/QueryBuilder'
import StudentList          from 'ui/shell/StudentResults/StudentList'
import { ResultsHeader }    from 'ui/shell/SmartTags/'

import tagStore             from 'stores/TagStore'

const studentPlaceholder = [
  {
    name:       'Student One',
    last_first: 'One, Student',
    grade:      'Grade 03',
    school:     'Anytown Upper Elementary School',
    id:         '51db4bd8e9c77f81290001ec'
  },
  {
    name:       'Student Two',
    last_first: 'Two, Student',
    grade:      'Grade 03',
    school:     'Anytown Upper Elementary School',
    id:         '51db4bd8e9c77f81290001ed'
  },
  {
    name:       'Student Three',
    last_first: 'Three, Student',
    grade:      'Grade 03',
    school:     'Anytown Upper Elementary School',
    id:         '51db4bd8e9c77f81290001ee'
  },
  {
    name:       'Student Four',
    last_first: 'Four, Student',
    grade:      'Grade 03',
    school:     'Anytown Upper Elementary School',
    id:         '51db4bd8e9c77f81290001ef'
  },
]

@observer
export default class TagBuilder extends Component {
  render(){
    return (
      <div>
        <ModuleHeader title='Tag Builder'/>
        <Row>
          <Col xs="12" sm="5">
            <QueryBuilder 
              schema   = {tagStore.schema}
              onChange = {tagStore.handleChange}
              onTest   = {tagStore.testTag}
              onSave   = {tagStore.saveTag}
              disable  = {tagStore.disable}
            />
          </Col>
          <Col xs="12" sm="7">
            <ResultsHeader title='Students' results='15' total='20' />
            <StudentList students={studentPlaceholder} />
          </Col>
        </Row>
      </div>
    )
  }
}
