import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import StudentList   from '../'

const stories = storiesOf('StudentList', module)

const studentData = [
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

stories.addDecorator(withKnobs)
stories.add('StudentList', () =>
  <div>
    <StudentList onStudentClick={action('Student clicked!')} students={studentData} />
  </div>
)

