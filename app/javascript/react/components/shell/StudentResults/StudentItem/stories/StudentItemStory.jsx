import React         from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action }    from '@storybook/addon-actions'
import StudentItem   from '../'

const stories = storiesOf('StudentItem', module)

const studentData =  {
  'id':          '51db4e3fe9c77f81290015ab',
  'first_name':  'Joan',
  'last_name':   'Campbell',
  'grade':       '03',
  'school_name': 'Anytown Upper Elementary Sch',
  'latitude':    '30.813846811652184',
  'longitude':   '-89.42892752587795'
}

stories.addDecorator(withKnobs)
stories.add('StudentItem', () => 
  <div>
    <StudentItem onStudentClick={action('Student clicked!')} student={studentData} />
  </div>
)

