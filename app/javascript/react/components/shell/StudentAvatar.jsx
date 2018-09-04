import React from 'react'

const StudentAvatar = (props) => {
  const imgSize = (props.size || 30)
  const imgURL  = `url(https://api.schoolstatus.com/avatars/student/${props.id}.png)`

  return (
    <div className={props.className} style={{
      background:      '#ababab 50% 50% no-repeat',
      backgroundSize:  imgSize,
      backgroundImage: imgURL,
      width:           imgSize,
      height:          imgSize,
      borderRadius:    500,
    }}
    />
  )
}

export default StudentAvatar
