import React      from 'react'
import {observer} from 'mobx-react'

const Title = ({group}) => { 
  return (
    <span className='mb-0'>
      <span className='d-inline-block font-weight-bold' style={{color: '#292B2C'}}>
        {group.group_name}
      </span>
    </span>
  )
}

export default observer(Title) 