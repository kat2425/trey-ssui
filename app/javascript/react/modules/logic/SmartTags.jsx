import React        from 'react'
import ModuleHeader from 'ui/shell/ModuleHeader'
import { TagList }  from 'ui/shell/SmartTags/'
import StudentList  from 'ui/shell/StudentResults/StudentList'

import {
  TagActionBar,
  ResultsHeader
} from 'ui/shell/SmartTags'

import {
  Row,
  Col
} from 'reactstrap'

const tagPlaceholder = [
  {
    'id':       '0',
    'name':     'Tag One',
    'query':    {'json': 'goes_here'},
    'isGlobal': true,
    'user':     true,
    'group':    true
  },
  {
    'id':       '1',
    'name':     'Tag Two',
    'query':    {'json': 'goes here as well'},
    'isGlobal': false,
    'user':     true,
    'group':    false
  },
  {
    'id':       '3',
    'name':     'what is this test',
    'query':    {'all': 'test'},
    'isGlobal': false,
    'user':     true,
    'group':    true
  }
]

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

export default function SmartTags() {
  return (
    <div>
      <ModuleHeader title='Smart Tags'/>
      <Row>
        <Col xs="12" sm="5">
          <TagList tags={tagPlaceholder} onClick={() => console.log('tag clicked')} />
        </Col>
        <Col xs="12" sm="7">
          <Row className='mb-3'>
            <Col xs='12' sm='6'>
              <ResultsHeader title='Students' results='15' total='20' />
              <p>Tag Name</p>
            </Col>
            <Col xs='12' sm='6'>
              <TagActionBar />
            </Col>
          </Row>
          <StudentList students={studentPlaceholder} />
        </Col>
      </Row>
    </div>
  )
}
