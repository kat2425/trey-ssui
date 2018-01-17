import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import fireEvent from 'helpers/FireEvent'

ContactLink.propTypes = {
  name:      PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  tag:       PropTypes.string
}

export default function ContactLink({name, studentId, tag = 'p', ...rest}){
  const Link = getComponent(tag)

  return <Link onClick={showStudentCard(studentId)} {...rest}>{name}</Link>
}


const showStudentCard = (id) => (e) => {
  e.stopPropagation()
  fireEvent('showStudentCard', { student: id })
}
const Link = styled.p`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const getComponent = (tag) => Link.withComponent(tag)
  


