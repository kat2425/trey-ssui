import React    from 'react'
import SSButton from 'ui/shell/SSButton'

const TypeSelector = ({type, selectClick}) => {
  return (
    <div className='text-center mt-4'>
      <SSButton
        style={GroupStyle}
        onClick={() => selectClick('group')}
        disabled={type === 'group'}
      >
        Groups
      </SSButton>
      <SSButton
        style={CourseStyle}
        onClick={() => selectClick('course')}
        disabled={type === 'course'}
      >
        Courses
      </SSButton>
      <SSButton
        style={ContactStyle}
        onClick={() => selectClick('contact')}
        disabled={type === 'contact'}
      >
        Contacts
      </SSButton>
    </div>
  )
}


const GroupStyle = ({
  backgroundColor: '#2e8b57',
  width:           '33%',
  color:           'white'
})
const CourseStyle = ({
  backgroundColor: '#be6f7c',
  width:           '33%',
  color:           'white'
})
const ContactStyle = ({
  backgroundColor: '#4F628E',
  width:           '33%',
  color:           'white'
})


export default TypeSelector
