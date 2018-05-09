import React      from 'react'
import {observer} from 'mobx-react'

const Description = observer( function Description({group, member}){
  return (
    <div>
      {showSchoolName(group, member)}
      <p className='text-muted'>{member.username}</p>
    </div>
  )
})

function showSchoolName(group, member) {
  if(group.groupType !== 'student') return null

  const schoolName = member.school_name 
    ? member.school_name
    : member.school
      ? member.school.school_name
      : null
      
  return (
    <p className='text-muted'>{schoolName}</p>
  )
}

export default Description