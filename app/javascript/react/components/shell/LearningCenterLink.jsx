import React            from 'react'
import { DropdownItem } from 'reactstrap'
import intercomEvent    from 'helpers/Intercom'

const LearningCenterLink = ({...props}) => ( 
  <DropdownItem onClick={handleOnClick} {...props}>
    <a target="_blank" href='/redirects/learning_lab'>Learning Lab</a>
  </DropdownItem>
)

const handleOnClick = () => {
  intercomEvent('web:help:learning_lab')
}

export default LearningCenterLink
