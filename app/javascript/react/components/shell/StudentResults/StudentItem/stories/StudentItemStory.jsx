import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import StudentItem   from '../'

const stories = storiesOf('StudentItem', module)

const studentData = {
  name:       'John Brown',
  last_first: 'Brown, John',
  grade:      'Grade 03',
  school:     'Anytown Upper Elementary School',
  id:         '51db4bd8e9c77f81290001ec'
}

stories.addDecorator(withKnobs)
stories.add('StudentItem', () => 
  <div>
    <StudentItem onStudentClick={action('Student clicked!')} student={studentData} />
  </div>
)

