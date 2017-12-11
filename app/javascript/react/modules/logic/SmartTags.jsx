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
    'id':          '51db4e3fe9c77f81290015ab',
    'first_name':  'Joan',
    'last_name':   'Campbell',
    'grade':       '03',
    'school_name': 'Anytown Upper Elementary Sch',
    'latitude':    '30.813846811652184',
    'longitude':   '-89.42892752587795'
  },
  {
    'id':          '51db4db9e9c77f8129001148',
    'first_name':  'Johnny',
    'last_name':   'Stewart',
    'grade':       '06',
    'school_name': 'Middle School Of Anytown',
    'latitude':    '30.81266261637211',
    'longitude':   '-89.51103396713734'
  },
  {
    'id':          '51db4e26e9c77f81290014ce',
    'first_name':  'Benjamin',
    'last_name':   'Gray',
    'grade':       '05',
    'school_name': 'Anytown Upper Elementary Sch',
    'latitude':    '30.812476202845573',
    'longitude':   '-89.41530995070934'
  }
]

export default function SmartTags() {
  return (
    <div>
      <ModuleHeader title='Smart Tags'/>
      <Row>
        <Col xs='12' sm='5'>
          <TagList tags={tagPlaceholder} onClick={() => console.log('tag clicked')} />
        </Col>
        <Col xs='12' sm='7'>
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
