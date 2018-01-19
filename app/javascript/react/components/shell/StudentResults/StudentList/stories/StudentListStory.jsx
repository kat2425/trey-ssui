import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import StudentList   from '../'

const stories = storiesOf('StudentList', module)

const studentData = [
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
    'id': '51db4e26e9c77f81290014ce',
    'first_name':  'Benjamin',
    'last_name':   'Gray',
    'grade':       '05',
    'school_name': 'Anytown Upper Elementary Sch',
    'latitude':    '30.812476202845573',
    'longitude':   '-89.41530995070934'
  }
]

stories.addDecorator(withKnobs)
stories.add('StudentList', () =>
  <div>
    <StudentList onStudentClick={action('Student clicked!')} students={studentData} />
  </div>
)

