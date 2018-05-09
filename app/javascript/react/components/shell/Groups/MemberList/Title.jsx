import React      from 'react'
import {observer} from 'mobx-react'

const Title = ({type, member}) => { 
  return (
    <span className='mb-0'>
      <span className='d-inline-block font-weight-bold' style={{color: '#292B2C'}}>
        {`${member.full_name}`}
      </span>
      {showGrade(type, member)}
    </span>
  )
}

function showGrade(type, member) {
  if(type !== 'student') return null
  return (
    <span className='text-muted'> {`, Grade ${member.grade}`} </span>
  )
}

export default observer(Title)